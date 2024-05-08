import './App.css'

import { Header } from "./Header";
import { Listing } from "./Listing";
import { Login } from "./Login";
import { New } from "./New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./Signup";


function App() {
  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/listing" element={<Listing />} />
          <Route exact path="/new" element={<New />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
