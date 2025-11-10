import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "/api/";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 5000
});

export async function getTodos() {
  return (await api.get("/todos")).data;
}
export async function createTodo(payload) {
  return (await api.post("/todos", payload)).data;
}
export async function deleteTodo(id) {
  return (await api.delete(`/todos/${id}`)).data;
}
export async function toggleTodo(id, patch) {
  return (await api.put(`/todos/${id}`, patch)).data;
}
