import React, { useEffect, useRef, useState } from "react";
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

  // For importing data.
  const fileInputRef = useRef(null);

  // When click the import button.
  function handleImportClick() {
    fileInputRef.current.click();
  }

  // Import JSON file and parse it.
  function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const saved = JSON.parse(localStorage.getItem("todo-events"));
        const merged = [...saved, ...json];
        localStorage.setItem("todo-events", JSON.stringify(merged));
        setTodoEvents(merged);
      } catch (err) {
        alert("Invalid JSON!");
      }
    };

    reader.readAsText(file);
  }

  // Update `todoEvents` when it changes.
  useEffect(() => {
    localStorage.setItem("todo-events", JSON.stringify(todoEvents));
  }, [todoEvents]);

  // Handle submiting the form.
  function handleSubmit(e) {
    e.preventDefault();
    if (!inputContent) {
      return;
    }

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

  // Remove all finished events.
  function handleRemoveFinished() {
    setTodoEvents((prev) => prev.filter((todo) => todo.done !== true));
  }

  // Export todo data.
  function handleExport() {
    const jsonString = JSON.stringify(todoEvents, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "todo.json";
    a.click();
    URL.revokeObjectURL(url);
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
          <MyButton
            type="button"
            text="Export"
            onClick={handleExport}
          />
          <div className="import-data">
            <MyButton
              type="button"
              text="Import"
              onClick={handleImportClick}
            />
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={handleImport}
            />
          </div>

          <div className="source-code">
            <MyButton
              type="button"
              text={"Source Code"}
              onClick={() => {
                const a = document.createElement("a");
                a.href = "https://github.com/Fovir-GitHub/todo-react";
                a.click();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
