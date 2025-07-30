//
// TodoAPI.js
// Handles all REST API calls to the backend for todo management.
//

const API_BASE = "http://localhost:3001";

// PUBLIC_INTERFACE
/**
 * Fetch all todos from backend.
 * @returns {Promise<Array>} List of todo objects
 */
export async function fetchTodos() {
  const resp = await fetch(`${API_BASE}/todos`);
  if (!resp.ok) throw new Error("Failed to fetch todos");
  return await resp.json();
}

// PUBLIC_INTERFACE
/**
 * Create a new todo.
 * @param {string} text Todo text
 * @returns {Promise<Object>} Created todo object
 */
export async function createTodo(text) {
  const resp = await fetch(`${API_BASE}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!resp.ok) throw new Error("Failed to create todo");
  return await resp.json();
}

// PUBLIC_INTERFACE
/**
 * Update the text of an existing todo.
 * @param {number|string} id
 * @param {string} newText
 * @returns {Promise<Object>} Updated todo object
 */
export async function updateTodo(id, newText) {
  const resp = await fetch(`${API_BASE}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: newText }),
  });
  if (!resp.ok) throw new Error("Failed to update todo");
  return await resp.json();
}

// PUBLIC_INTERFACE
/**
 * Delete a todo.
 * @param {number|string} id
 */
export async function deleteTodo(id) {
  const resp = await fetch(`${API_BASE}/todos/${id}`, { method: "DELETE" });
  if (!resp.ok) throw new Error("Failed to delete todo");
}

// PUBLIC_INTERFACE
/**
 * Toggle the completion status of a todo.
 * @param {number|string} id
 * @param {boolean} completed
 * @returns {Promise<Object>} Updated todo object
 */
export async function toggleComplete(id, completed) {
  const resp = await fetch(`${API_BASE}/todos/${id}/toggle`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  if (!resp.ok) throw new Error("Failed to toggle completion");
  return await resp.json();
}
