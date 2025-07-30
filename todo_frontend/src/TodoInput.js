import React, { useState, useEffect, useRef } from "react";

// PUBLIC_INTERFACE
/**
 * TodoInput component
 * @param {Object} props
 * @param {Function} props.onSubmit - Called with (text)
 * @param {string} props.initialValue - For editing, initial text
 * @param {boolean} props.editMode - If true, editing existing todo
 * @param {Function} props.onCancel - Called when cancel editing
 */
function TodoInput({ onSubmit, initialValue = "", editMode = false, onCancel }) {
  const [input, setInput] = useState(initialValue);
  const inputRef = useRef();

  useEffect(() => {
    setInput(initialValue);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [initialValue]);

  // Handle Enter for add/edit, Escape for cancel.
  function handleKeyDown(e) {
    if (e.key === "Enter" && input.trim()) {
      onSubmit(input.trim());
      setInput("");
    } else if (e.key === "Escape" && editMode && onCancel) {
      setInput(initialValue);
      onCancel();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
      setInput("");
    }
  }

  return (
    <form className="todo-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={editMode ? "Edit todo..." : "Add new todo..."}
        aria-label={editMode ? "Edit todo" : "Add new todo"}
        minLength={1}
        maxLength={100}
        autoComplete="off"
        required
      />
      <button className="btn-add" type="submit">
        {editMode ? "Save" : "Add"}
      </button>
      {editMode && (
        <button className="btn-cancel" type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default TodoInput;
