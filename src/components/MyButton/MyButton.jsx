import React from "react";
import "./MyButton.css";

export default function MyButton(props) {
  return (
    <button
      className="my-button"
      type={props.type}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
