import React, { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");
  function submit(e) {
    e.preventDefault();
    onAdd(text.trim());
    setText("");
  }
  return (
    <form className="todo-form" onSubmit={submit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new task..."
        aria-label="New task"
      />
      <button type="submit">Add</button>
    </form>
  );
}
