export type ColumnId = "todo" | "in-progress" | "done"

export type Priority = "low" | "medium" | "high"

export type Task = {
  id: string
  title: string
  description?: string
  status: ColumnId
  priority: Priority
  createdAt: number
}

export const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
]

export const PRIORITIES: { id: Priority; label: string }[] = [
  { id: "low", label: "Low" },
  { id: "medium", label: "Medium" },
  { id: "high", label: "High" },
]

export const DEFAULT_PRIORITY: Priority = "medium"
