export type ColumnId = "todo" | "in-progress" | "done"

export type Task = {
  id: string
  title: string
  description?: string
  status: ColumnId
  createdAt: number
}

export const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
]
