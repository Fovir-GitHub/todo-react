import React, { useEffect, useState } from "react";
import MyButton from "./components/MyButton/MyButton";
import TodoEvent from "./components/TodoEvent/TodoEvent";

export default function App() {
  // Textarea.
  const [inputContent, setInputContent] = useState("");
  // Event list.
  const [todoEvents, setTodoEvents] = useState([]);

  // Load events from `localStorage`.
  useEffect(() => {
    const saved = localStorage.getItem("todo-events");
    if (saved) setTodoEvents(JSON.parse(saved));
  }, []);

  // Save events to `localStorage`.
  function handleSave(eventArray) {
    localStorage.setItem("todo-events", JSON.stringify(eventArray));
  }

  // Handle submiting the form.
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

  // Submit when pressing enter.
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
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
              onKeyDown={handleKeyDown}
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
