import { COLUMNS, DEFAULT_PRIORITY, PRIORITIES, type Task } from "./types"

const STORAGE_KEY = "kanban.tasks.v1"
const COLUMN_IDS = new Set(COLUMNS.map((c) => c.id))
const PRIORITY_IDS = new Set(PRIORITIES.map((p) => p.id))

/** Tasks saved before priorities existed have no `priority` field. */
type StoredTask = Omit<Task, "priority"> & { priority?: Task["priority"] }

function isStoredTask(value: unknown): value is StoredTask {
  if (typeof value !== "object" || value === null) return false
  const t = value as Record<string, unknown>
  return (
    typeof t.id === "string" &&
    typeof t.title === "string" &&
    (t.description === undefined || typeof t.description === "string") &&
    COLUMN_IDS.has(t.status as Task["status"]) &&
    (t.priority === undefined || PRIORITY_IDS.has(t.priority as Task["priority"])) &&
    typeof t.createdAt === "number"
  )
}

export function loadTasks(): Task[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(isStoredTask)
      .map((t) => ({ ...t, priority: t.priority ?? DEFAULT_PRIORITY }))
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
