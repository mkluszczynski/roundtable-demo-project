"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { PrioritySelect } from "@/components/kanban/priority"
import { Button } from "@/components/ui/button"
import { DEFAULT_PRIORITY, type Priority } from "@/lib/kanban/types"
import { cn } from "@/lib/utils"

type ColumnProps = {
  title: string
  count: number
  onAdd: (title: string, description: string | undefined, priority: Priority) => void
  onDropTask: (taskId: string) => void
  children: React.ReactNode
}

export function Column({ title, count, onAdd, onDropTask, children }: ColumnProps) {
  const [adding, setAdding] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newPriority, setNewPriority] = useState<Priority>(DEFAULT_PRIORITY)
  const [dragOver, setDragOver] = useState(false)

  function reset() {
    setNewTitle("")
    setNewDescription("")
    setNewPriority(DEFAULT_PRIORITY)
    setAdding(false)
  }

  return (
    <section
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOver(false)
      }}
      onDrop={(e) => {
        e.preventDefault()
        setDragOver(false)
        const taskId = e.dataTransfer.getData("text/plain")
        if (taskId) onDropTask(taskId)
      }}
      onDropCapture={() => setDragOver(false)}
      className={cn(
        "flex min-h-64 flex-col gap-3 rounded-xl border bg-muted/40 p-3 transition-colors",
        dragOver && "border-primary/50 bg-muted"
      )}
    >
      <header className="flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold">{title}</h2>
        <span className="rounded-full bg-background px-2 text-xs text-muted-foreground">{count}</span>
      </header>

      <div className="flex flex-1 flex-col gap-2">{children}</div>

      {adding ? (
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            const trimmed = newTitle.trim()
            if (!trimmed) return
            onAdd(trimmed, newDescription.trim() || undefined, newPriority)
            reset()
          }}
          onKeyDown={(e) => e.key === "Escape" && reset()}
        >
          <input
            autoFocus
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Task title"
            className="rounded-md border bg-background px-2 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
            aria-label="New task title"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            rows={2}
            placeholder="Description (optional)"
            className="resize-none rounded-md border bg-background px-2 py-1 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
            aria-label="New task description"
          />
          <PrioritySelect value={newPriority} onChange={setNewPriority} aria-label="New task priority" />
          <div className="flex justify-end gap-1">
            <Button type="button" variant="ghost" size="sm" onClick={reset}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={!newTitle.trim()}>
              Add
            </Button>
          </div>
        </form>
      ) : (
        <Button variant="ghost" className="justify-start" onClick={() => setAdding(true)}>
          <Plus data-icon="inline-start" />
          Add task
        </Button>
      )}
    </section>
  )
}
