"use client";

import { useState, useRef, useEffect } from "react";
import type { Todo } from "@/lib/types";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const CATEGORY_ICONS: Record<string, string> = {
  work: "💼",
  personal: "👤",
  shopping: "🛒",
  other: "📌",
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    }
    setEditing(false);
  };

  return (
    <div
      className={`group flex items-center gap-3 px-5 py-4 rounded-xl border
                   transition-all duration-200 hover:shadow-md
                   ${todo.completed
                     ? "bg-gray-50 border-gray-200"
                     : "bg-white border-gray-200 hover:border-blue-300"
                   }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2
                     flex items-center justify-center transition-all
                     ${todo.completed
                       ? "bg-green-500 border-green-500"
                       : "border-gray-300 hover:border-blue-400"
                     }`}
      >
        {todo.completed && <span className="text-white text-xs">✓</span>}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            ref={inputRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") {
                setEditText(todo.text);
                setEditing(false);
              }
            }}
            className="w-full px-2 py-1 border-2 border-blue-400 rounded-lg
                       focus:outline-none text-gray-800"
          />
        ) : (
          <div className="flex items-center gap-2">
            <span
              className={`text-sm ${
                todo.completed
                  ? "line-through text-gray-400"
                  : "text-gray-800"
              }`}
            >
              {todo.text}
            </span>
            <span className="text-xs" title={todo.category}>
              {CATEGORY_ICONS[todo.category]}
            </span>
          </div>
        )}
        <div className="text-xs text-gray-400 mt-0.5">
          {new Date(todo.createdAt).toLocaleDateString("zh-CN", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => {
            setEditText(todo.text);
            setEditing(true);
          }}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50
                     rounded-lg transition-colors"
          title="编辑"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50
                     rounded-lg transition-colors"
          title="删除"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
