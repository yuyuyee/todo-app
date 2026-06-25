"use client";

import { useTodos } from "@/lib/hooks";
import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItem";
import TodoFilter from "@/components/TodoFilter";

export default function Home() {
  const {
    todos,
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
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600
                         bg-clip-text text-transparent mb-3">
            ✅ Todo List
          </h1>
          <p className="text-gray-500 text-lg">
            简洁高效 · 本地存储 · 随时随地管理任务
          </p>
        </header>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl shadow-gray-200/50
                        border border-gray-100 p-6 space-y-6">
          {/* Add Todo Form */}
          <TodoForm onAdd={addTodo} />

          <hr className="border-gray-100" />

          {/* Filters */}
          <TodoFilter
            filter={filter}
            onFilterChange={setFilter}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            search={search}
            onSearchChange={setSearch}
            stats={stats}
          />

          {/* Todo List */}
          {todos.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">
                {stats.total === 0 ? "📝" : "🔍"}
              </div>
              <p className="text-gray-400 text-lg">
                {stats.total === 0
                  ? "还没有待办事项，开始添加一个吧！"
                  : "没有找到匹配的待办事项"}
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))}
            </div>
          )}

          {/* Footer */}
          {stats.total > 0 && (
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                共 <span className="font-semibold text-gray-700">{stats.total}</span> 项，
                已完成 <span className="font-semibold text-green-600">{stats.completed}</span> 项
              </p>
              {stats.completed > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-sm text-red-500 hover:text-red-700 transition-colors
                             font-medium"
                >
                  清除已完成 ✕
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-10 text-sm text-gray-400">
          <p>数据存储在浏览器本地 localStorage · 不会上传到任何服务器</p>
        </footer>
      </div>
    </div>
  );
}
