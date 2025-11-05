import React from "react";
import TodoApp from "./Components/todo";

export default function App() {
  return (
    <div className="app-container">
      <header>
        <h1>📝 Todo App</h1>
        <p className="subtitle">React + Node + MongoDB (Atlas)</p>
      </header>
      <main>
        <TodoApp />
      </main>
    </div>
  );
}
