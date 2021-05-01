import React from "react";
import "./Error.css";
const Error = () => {
  return (
    <div>
      <div className="spacer"></div>
      <div className="error-wrapper">
        <img className="error-img" src="../../images/error.jpg" alt=""></img>
        <h1 className="error-msg">Page not found</h1>
      </div>
    </div>
  );
};

export default Error;
