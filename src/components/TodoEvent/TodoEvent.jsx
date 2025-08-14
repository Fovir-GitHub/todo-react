import React, { useState } from "react";
import "./TodoEvent.css";
import MyCheckBox from "../MyCheckBox/MyCheckBox";

export default function TodoEvent({ eventName, done = false }) {
  return (
    <div className="todo-event">
      <MyCheckBox boxStatus={done} />
      <label>{eventName}</label>
    </div>
  );
}
