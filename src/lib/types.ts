export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  category: TodoCategory;
}

export type TodoCategory = "work" | "personal" | "shopping" | "other";

export type FilterType = "all" | "active" | "completed";

export const CATEGORIES: { value: TodoCategory; label: string; icon: string }[] = [
  { value: "work", label: "工作", icon: "💼" },
  { value: "personal", label: "个人", icon: "👤" },
  { value: "shopping", label: "购物", icon: "🛒" },
  { value: "other", label: "其他", icon: "📌" },
];
