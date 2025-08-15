import React, { useEffect, useState } from "react";
import MyButton from "./components/MyButton/MyButton";
import TodoEvent from "./components/TodoEvent/TodoEvent";

export default function App() {
  // Textarea.
  const [inputContent, setInputContent] = useState("");
  // Event list.
  const [todoEvents, setTodoEvents] = useState(() => {
    // Load events from `localStorage`.
    const saved = localStorage.getItem("todo-events");
    return saved ? JSON.parse(saved) : [];
  });

  // Update `todoEvents` when it changes.
  useEffect(() => {
    localStorage.setItem("todo-events", JSON.stringify(todoEvents));
  }, [todoEvents]);

  // Handle submiting the form.
  function handleSubmit(e) {
    e.preventDefault();
    const newEvent = {
      id: crypto.randomUUID(),
      name: inputContent,
      done: false,
    };
    setTodoEvents((prevEvents) => {
      const updated = [...prevEvents, newEvent];
      return updated;
    });
    setInputContent("");
  }

  // Toggle done by id.
  function toggleDoneById(id) {
    setTodoEvents((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  // Edit event by id.
  function handleEditById(id) {
    const newEventContent = prompt("Please enter new event");
    if (!newEventContent) {
      return;
    }

    setTodoEvents((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, name: newEventContent } : todo,
      ),
    );

    return newEventContent;
  }

  // Delete item by id.
  function handleDeleteById(id) {
    setTodoEvents((prev) => prev.filter((todo) => todo.id !== id));
  }

  function handleRemoveFinished() {
    setTodoEvents((prev) => prev.filter((todo) => todo.done !== true));
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
          {todoEvents.map((todo) => (
            <TodoEvent
              key={todo.id}
              eventName={todo.name}
              done={todo.done}
              onToggle={() => toggleDoneById(todo.id)}
              onEdit={() => handleEditById(todo.id)}
              onDelete={() => handleDeleteById(todo.id)}
            />
          ))}
        </div>

        <div className="other-functions">
          <MyButton
            type="button"
            text="Remove Finished"
            onClick={handleRemoveFinished}
          />
        </div>
      </div>
    </>
  );
}
