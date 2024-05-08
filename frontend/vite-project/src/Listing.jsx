import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const Listing = () => {
    const navigate = useNavigate();

  const getResponse = async () => {
    try {
    await axios
      .get("http://localhost:8001/listing",{withCredentials: true})
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => {
        navigate("/login")
      });        
    } catch (error) {
        console.log(error)
    }

  };

  useEffect(() => {
    getResponse();
  });

  return (
    <>
      <div style={{ fontSize: 30 }}>Listing</div>
    </>
  );
};
