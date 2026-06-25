"use client";

import { useState } from "react";
import type { TodoCategory } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

interface Props {
  onAdd: (text: string, category: TodoCategory) => void;
}

export default function TodoForm({ onAdd }: Props) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState<TodoCategory>("personal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, category);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="添加新的待办事项..."
        className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200
                   focus:border-blue-500 focus:outline-none transition-colors
                   text-gray-800 placeholder-gray-400"
        autoFocus
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as TodoCategory)}
        className="px-4 py-3 rounded-xl border-2 border-gray-200
                   bg-white text-gray-700 focus:border-blue-500
                   focus:outline-none cursor-pointer min-w-[120px]"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.icon} {cat.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl
                   hover:bg-blue-700 active:scale-95 transition-all shadow-lg
                   shadow-blue-200 whitespace-nowrap"
      >
        ➕ 添加
      </button>
    </form>
  );
}
