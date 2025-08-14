import React from "react";
import MyButton from "./components/MyButton/MyButton";
import TodoEvent from "./components/TodoEvent/TodoEvent";
import MyCheckBox from "./components/MyCheckBox/MyCheckBox";

export default function App() {
  return (
    <>
      <div className="todo-panel">
        <div className="title">
          <h1>Todo List</h1>
          <hr />
        </div>

        <div className="new-event">
          <form method="post">
            <label htmlFor="event-content">Event</label>
            <textarea
              name="event-content"
              className="event-content"
              rows={1}
            ></textarea>
            <MyButton type="button" text="Add Event" />
          </form>
        </div>

        <div className="todo-list">
          <TodoEvent eventName={"Test"} done={"true"} />
          <TodoEvent eventName={"Test"} />
          <TodoEvent eventName={"Test"} />
          <TodoEvent eventName={"Test"} />
          <TodoEvent eventName={"Test"} />
          <TodoEvent eventName={"Test"} />
        </div>
      </div>
    </>
  );
}
