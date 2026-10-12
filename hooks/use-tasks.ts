"use client"

import { useCallback, useEffect, useState } from "react"

import { loadTasks, saveTasks } from "@/lib/kanban/storage"
import type { ColumnId, Task } from "@/lib/kanban/types"

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time load from localStorage after mount
    setTasks(loadTasks())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) saveTasks(tasks)
  }, [tasks, hydrated])

  const addTask = useCallback(
    (status: ColumnId, title: string, description?: string) => {
      const task: Task = {
        id: crypto.randomUUID(),
        title,
        description: description || undefined,
        status,
        createdAt: Date.now(),
      }
      setTasks((prev) => [...prev, task])
    },
    []
  )

  const updateTask = useCallback(
    (id: string, changes: Partial<Omit<Task, "id" | "createdAt">>) => {
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...changes } : t)))
    },
    []
  )

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  /** Move a task to `status`, optionally placing it before the task with id `beforeId`. */
  const moveTask = useCallback(
    (id: string, status: ColumnId, beforeId?: string) => {
      setTasks((prev) => {
        const task = prev.find((t) => t.id === id)
        if (!task || id === beforeId) return prev
        const rest = prev.filter((t) => t.id !== id)
        const moved = { ...task, status }
        const index = beforeId ? rest.findIndex((t) => t.id === beforeId) : -1
        if (index === -1) return [...rest, moved]
        return [...rest.slice(0, index), moved, ...rest.slice(index)]
      })
    },
    []
  )

  return { tasks, hydrated, addTask, updateTask, deleteTask, moveTask }
}
