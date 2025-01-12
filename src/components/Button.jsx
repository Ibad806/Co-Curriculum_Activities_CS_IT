import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  return (
    <>
      <Link
        to={props.url}
        className="fancy inline-block float-right relative text-black no-underline"
      >
        <span className="top-key"></span>
        <span className="text">{props.title}</span>
        <span className="bottom-key-1"></span>
        <span className="bottom-key-2"></span>
      </Link>
    </>
  );
};

export default Button;
