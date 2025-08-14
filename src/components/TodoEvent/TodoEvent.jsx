import React from "react";
import "./TodoEvent.css";

export default function TodoEvent({ eventName, done = false }) {
  return (
    <div className="todo-event">
      <input type="checkbox" checked={done} />
      <label>{eventName}</label>
    </div>
  );
}
