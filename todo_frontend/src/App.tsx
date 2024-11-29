import React, { useState, useEffect } from "react";
import "./App.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/iteams/");
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data: Todo[] = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (input.trim()) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/iteams/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: input, completed: false }),
        });

        if (!response.ok) {
          throw new Error("Failed to add todo");
        }

        const newTodo: Todo = await response.json();
        setTodos([...todos, { id: newTodo.id, text: newTodo.text, completed: newTodo.completed }]);
        setInput("");
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/iteams/${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodos(todos.filter((t) => t.id !== id || t.completed === false));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggleComplete = async (id: number) => {
    const todoToUpdate = todos.find((t) => t.id === id);
    if (!todoToUpdate) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/iteams/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...todoToUpdate, completed: !todoToUpdate.completed }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const updatedTodo: Todo = await response.json();
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-600 to-emerald-400">
      <div className="bg-white shadow-lg rounded-3xl p-16">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">React To-Do List ☑️</h1>

        <div className="mb-4 flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add a new ToDo"
            className="flex-grow px-3 py-2 border border-black rounded-l-lg focus:ring-blue-500"
          />
          <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center p-3 rounded-lg bg-slate-100 border border-gray-200"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id)}
                className="mr-2 h-5 w-5 text-blue-600"
              />
              <span
                className={`flex-grow ${
                  todo.completed ? "line-through text-gray-500" : "text-gray-800"
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="ml-2 border-none p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
