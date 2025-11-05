import React, { useEffect, useState } from "react";
import { getTodos, createTodo, deleteTodo, toggleTodo } from "../api";
import TodoForm from "./tofoform";
import TodoList from "./todolist";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      setError("Failed to load todos. Check backend URL / CORS.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(title) {
    if (!title) return;
    try {
      const created = await createTodo({ title, completed: false });
      setTodos(prev => [created, ...prev]);
    } catch {
      setError("Failed to add todo");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(t => t._id !== id));
    } catch {
      setError("Failed to delete todo");
    }
  }

  async function handleToggle(todo) {
    try {
      const updated = await toggleTodo(todo._id, { completed: !todo.completed });
      setTodos(prev => prev.map(t => (t._id === updated._id ? updated : t)));
    } catch {
      setError("Failed to update todo");
    }
  }

  return (
    <section className="todo-app">
      <TodoForm onAdd={handleAdd} />
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <TodoList todos={todos} onDelete={handleDelete} onToggle={handleToggle} />
      )}
    </section>
  );
}
