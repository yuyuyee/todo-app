"use client";

import { useState, useEffect, useCallback } from "react";
import type { Todo, TodoCategory, FilterType } from "./types";

const STORAGE_KEY = "todo-app-data";

function loadTodos(): Todo[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTodos(todos: Todo[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [categoryFilter, setCategoryFilter] = useState<TodoCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setTodos(loadTodos());
    setMounted(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (mounted) {
      saveTodos(todos);
    }
  }, [todos, mounted]);

  const addTodo = useCallback((text: string, category: TodoCategory) => {
    const todo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      category,
    };
    setTodos((prev) => [todo, ...prev]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const editTodo = useCallback((id: string, text: string, category?: TodoCategory) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text, ...(category ? { category } : {}) } : t))
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }, []);

  // Apply filters
  const filteredTodos = todos
    .filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    })
    .filter((t) => {
      if (categoryFilter === "all") return true;
      return t.category === categoryFilter;
    })
    .filter((t) => {
      if (!search) return true;
      return t.text.toLowerCase().includes(search.toLowerCase());
    });

  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return {
    todos: filteredTodos,
    allTodos: todos,
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    search,
    setSearch,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
  };
}
