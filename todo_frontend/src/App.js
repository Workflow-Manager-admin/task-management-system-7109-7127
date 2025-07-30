import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleComplete,
} from "./TodoAPI";

// PUBLIC_INTERFACE
/**
 * Main App Component for Todo Frontend
 * Features: list, add, edit, delete, toggle complete. Responsive. Light theme.
 */
function App() {
  const [theme, setTheme] = useState("light");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // Properly apply theme var to document root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    // Load todos on mount
    (async () => {
      setLoading(true);
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (e) {
        // Silently fail for minimal UI
        setTodos([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // PUBLIC_INTERFACE
  const handleAddTodo = async (text) => {
    const newTodo = await createTodo(text);
    setTodos((prev) => [newTodo, ...prev]);
  };

  // PUBLIC_INTERFACE
  const handleEditTodo = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  // PUBLIC_INTERFACE
  const handleSaveEdit = async (newText) => {
    if (editId && newText) {
      const updated = await updateTodo(editId, newText);
      setTodos((prev) =>
        prev.map((t) => (t.id === editId ? updated : t))
      );
      setEditId(null);
      setEditText("");
    }
  };

  // PUBLIC_INTERFACE
  const handleCancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  // PUBLIC_INTERFACE
  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
    handleCancelEdit();
  };

  // PUBLIC_INTERFACE
  const handleToggleComplete = async (id, completed) => {
    const updated = await toggleComplete(id, completed);
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? updated : t))
    );
  };

  return (
    <div className="App">
      <header className="todo-header">
        <div className="todo-title">📝 Todo App</div>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </header>
      <main className="todo-main">
        {loading ? (
          <div className="todo-loading">Loading...</div>
        ) : (
          <React.Fragment>
            <TodoList
              todos={todos}
              onToggle={handleToggleComplete}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
            <div className="todo-form-area">
              <TodoInput
                onSubmit={editId ? handleSaveEdit : handleAddTodo}
                initialValue={editText}
                editMode={!!editId}
                onCancel={handleCancelEdit}
              />
            </div>
          </React.Fragment>
        )}
      </main>
      <footer className="todo-footer">
        <span>
          &copy; {new Date().getFullYear()} Minimal Todo • Modern, Responsive, Light Theme
        </span>
      </footer>
    </div>
  );
}

export default App;
