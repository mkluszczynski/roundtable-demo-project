"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { fieldClassName, PrioritySelect } from "@/components/kanban/priority"
import { Button } from "@/components/ui/button"
import { DEFAULT_PRIORITY, type ColumnId, type Priority } from "@/lib/kanban/types"
import { cn } from "@/lib/utils"

const COLUMN_ACCENTS: Record<ColumnId, string> = {
  todo: "bg-nb-yellow",
  "in-progress": "bg-nb-violet",
  done: "bg-nb-teal",
}

type ColumnProps = {
  id: ColumnId
  title: string
  count: number
  onAdd: (title: string, description: string | undefined, priority: Priority) => void
  onDropTask: (taskId: string) => void
  children: React.ReactNode
}

export function Column({ id, title, count, onAdd, onDropTask, children }: ColumnProps) {
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
        "flex min-h-72 flex-col overflow-hidden rounded-2xl border-2 border-foreground bg-card shadow-brutal transition-all",
        dragOver && "-translate-x-0.5 -translate-y-0.5 border-dashed bg-muted shadow-brutal-lg"
      )}
    >
      <header
        className={cn(
          "flex items-center justify-between border-b-2 border-foreground px-4 py-3 text-nb-ink",
          COLUMN_ACCENTS[id]
        )}
      >
        <h2 className="text-base font-bold tracking-tight">{title}</h2>
        <span className="min-w-7 rounded-full border-2 border-nb-ink bg-white px-2 text-center text-xs font-bold">
          {count}
        </span>
      </header>

      <div className="flex flex-1 flex-col gap-3 p-3">{children}</div>

      {adding ? (
        <form
          className="flex flex-col gap-2.5 px-3 pb-3"
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
            className={cn(fieldClassName, "text-sm")}
            aria-label="New task title"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            rows={2}
            placeholder="Description (optional)"
            className={cn(fieldClassName, "resize-none text-xs")}
            aria-label="New task description"
          />
          <PrioritySelect value={newPriority} onChange={setNewPriority} aria-label="New task priority" />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={reset}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={!newTitle.trim()}>
              Add
            </Button>
          </div>
        </form>
      ) : (
        <div className="px-3 pb-3">
          <Button variant="outline" className="w-full" onClick={() => setAdding(true)}>
            <Plus data-icon="inline-start" />
            Add task
          </Button>
        </div>
      )}
    </section>
  )
}
