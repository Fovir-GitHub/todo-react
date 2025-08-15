import React from "react";
import "./TodoEvent.css";
import MyCheckBox from "../MyCheckBox/MyCheckBox";
import MyButton from "../MyButton/MyButton";

export default function TodoEvent({
  eventName,
  onToggle,
  done = false,
}) {
  return (
    <div className="todo-event">
      <MyCheckBox
        boxStatus={done}
        eventName={eventName}
        onToggle={onToggle}
      />
      <div className="todo-event-actions">
        <MyButton text={"Edit"} />
        <MyButton text={"Delete"} />
      </div>
    </div>
  );
}
