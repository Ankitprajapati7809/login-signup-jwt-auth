const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.get("/", (req, resp) => {
  resp.send("aa gya ");
});

app.use(bodyParser.json());

const JWT_SECRET = "sdfgh5678";

const users = [
  { id: 1, username: "raj", password: "123456", email: "raj@gmail.com" },
  { id: 2, username: "ankit", password: "123456", email: "ankit@gmail.com" },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  // Creating a JWT token with the user's ID and a secret key
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    {
      expiresIn: "2m", 
    }
  );
  res.cookie("authToken", token, {
    maxAge: 120000,
    httpOnly: true,
    secure: false,
    // sameSite: "strict",
  });

  res.json("Login successful");
});

// Middleware to authenticate requests by verifying the JWT token
const authenticateJWT = (req, res, next) => {
  // console.log (req.cookies.authToken);
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(403).json({ error: "Unauthorized. No token provided." });
  }

  try {
    // console.log("Aa gya bhi")
    const decoded = jwt.verify(token, JWT_SECRET); 
    console.log("--------------")
    console.log(decoded)
    console.log("..............")
    req.user = decoded; // Set the user data on the request object
    next(); 
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized. Invalid token." });
  }
};

// Protected route requiring authentication
app.get("/listing", authenticateJWT, (req, res) => {
  // console.log("Aa gya be in listing bhi")
  // console.log(req.user);
  res.json({ message: "You have accessed the listing!", user: req.user });
});

// protected route
app.get("/new", authenticateJWT, (req, res) => {
  console.log("new ka hai be");
  console.log(req.user);
  res.json({ message: "This is a public route accessible to everyone." });
});

app.listen("8001", function () {
  console.log("Server is runing on port 8001...");
});
