"use client";

import type { FilterType, TodoCategory } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

interface Props {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  categoryFilter: TodoCategory | "all";
  onCategoryChange: (c: TodoCategory | "all") => void;
  search: string;
  onSearchChange: (s: string) => void;
  stats: { total: number; active: number; completed: number };
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "active", label: "进行中" },
  { value: "completed", label: "已完成" },
];

export default function TodoFilter({
  filter,
  onFilterChange,
  categoryFilter,
  onCategoryChange,
  search,
  onSearchChange,
  stats,
}: Props) {
  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="搜索待办事项..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200
                     focus:border-blue-500 focus:outline-none text-sm text-gray-700"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
                       hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        {/* Status filters */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                          ${filter === f.value
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-gray-600 hover:text-gray-800"
                          }`}
            >
              {f.label}
              <span className="ml-1.5 text-xs text-gray-400">
                {f.value === "all" && stats.total}
                {f.value === "active" && stats.active}
                {f.value === "completed" && stats.completed}
              </span>
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => onCategoryChange("all")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all
                        ${categoryFilter === "all"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-800"
                        }`}
          >
            📋 全部
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all
                          ${categoryFilter === cat.value
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-gray-600 hover:text-gray-800"
                          }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
