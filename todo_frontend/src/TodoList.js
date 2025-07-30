import React from "react";

// PUBLIC_INTERFACE
/**
 * TodoList component
 * @param {Object} props
 * @param {Array} props.todos - List of todo objects
 * @param {Function} props.onToggle - Called with (id, completed)
 * @param {Function} props.onDelete - Called with (id)
 * @param {Function} props.onEdit - Called with (id, currentText)
 */
function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (!todos.length)
    return (
      <div className="todo-empty" data-testid="todo-empty">
        You have no todos. Enjoy your day!
      </div>
    );

  return (
    <ul className="todo-list" data-testid="todo-list">
      {todos.map((todo) => (
        <li
          className={
            "todo-item" + (todo.completed ? " completed" : "")
          }
          key={todo.id}
        >
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id, !todo.completed)}
            />
            <span className="checkmark" />
          </label>
          <span
            className="todo-text"
            aria-label={todo.completed ? "Completed todo" : ""}
          >
            {todo.text}
          </span>
          <button
            className="btn-edit"
            onClick={() => onEdit(todo.id, todo.text)}
            aria-label="Edit todo"
          >
            ✏️
          </button>
          <button
            className="btn-delete"
            onClick={() => onDelete(todo.id)}
            aria-label="Delete todo"
          >
            🗑
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
