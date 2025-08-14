import React from "react";
import "./MyButton.css";

export default function MyButton({ text, onClick, type = "button" }) {
  return (
    <button className="my-button" type={type} onClick={onClick}>
      {text}
    </button>
  );
}
