import Axios from "axios";
import React, { useEffect } from "react";

export const New = () => {
  const getResponse = async () => {
    try {
      await Axios.get("http://localhost:8001/new", { withCredentials: true })
        .then((res) => {
          console.log(res.data);
        })
        .catch(() => {
          navigate("/login");
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getResponse();
  });
  return (
    <>
      <br />

      <div style={{ fontSize: 30 }}>New</div>
    </>
  );
};
