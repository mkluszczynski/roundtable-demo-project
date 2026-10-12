import { COLUMNS, type Task } from "./types"

const STORAGE_KEY = "kanban.tasks.v1"
const COLUMN_IDS = new Set(COLUMNS.map((c) => c.id))

function isTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) return false
  const t = value as Record<string, unknown>
  return (
    typeof t.id === "string" &&
    typeof t.title === "string" &&
    (t.description === undefined || typeof t.description === "string") &&
    COLUMN_IDS.has(t.status as Task["status"]) &&
    typeof t.createdAt === "number"
  )
}

export function loadTasks(): Task[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isTask) : []
  } catch {
    return []
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // Storage unavailable (private mode, quota) — keep in-memory state only.
  }
}
