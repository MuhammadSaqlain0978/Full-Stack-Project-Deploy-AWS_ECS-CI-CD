import React from "react";

export default function TodoList({ todos = [], onDelete, onToggle }) {
  if (!todos.length) return <div className="empty">No todos yet — add one above.</div>;
  return (
    <ul className="todo-list">
      {todos.map(t => (
        <li key={t._id} className={t.completed ? "completed" : ""}>
          <label>
            <input type="checkbox" checked={t.completed} onChange={() => onToggle(t)} />
            <span className="title">{t.title}</span>
          </label>
          <button className="delete" onClick={() => onDelete(t._id)}>✕</button>
        </li>
      ))}
    </ul>
  );
}
