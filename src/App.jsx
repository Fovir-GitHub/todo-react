import React, { useEffect, useState } from "react";
import MyButton from "./components/MyButton/MyButton";
import TodoEvent from "./components/TodoEvent/TodoEvent";

export default function App() {
  const [inputContent, setInputContent] = useState("");
  const [todoEvents, setTodoEvents] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("todo-events");
    if (saved) setTodoEvents(JSON.parse(saved));
  }, []);

  function handleSave(eventArray) {
    localStorage.setItem("todo-events", JSON.stringify(eventArray));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newEvent = { name: inputContent, done: false };
    setTodoEvents((prevEvents) => {
      const updated = [...prevEvents, newEvent];
      handleSave(updated);
      return updated;
    });
    setInputContent("");
  }

  return (
    <>
      <div className="todo-panel">
        <div className="title">
          <h1>Todo List</h1>
          <hr />
        </div>

        <div className="new-event">
          <form method="get" onSubmit={handleSubmit}>
            <label htmlFor="event-content">Event</label>
            <textarea
              name="event-content"
              className="event-content"
              rows={1}
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
            ></textarea>
            <MyButton type="submit" text="Add Event" />
          </form>
        </div>

        <div className="todo-list">
          {todoEvents.map((todo, index) => (
            <TodoEvent
              key={index}
              eventName={todo.name}
              done={todo.done}
            />
          ))}
        </div>
      </div>
    </>
  );
}
