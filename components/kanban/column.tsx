"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ColumnProps = {
  title: string
  /** Background class for the column header strip, e.g. `bg-nb-yellow`. */
  accent?: string
  count: number
  onAdd: (title: string, description?: string) => void
  onDropTask: (taskId: string) => void
  children: React.ReactNode
}

export function Column({
  title,
  accent = "bg-nb-yellow",
  count,
  onAdd,
  onDropTask,
  children,
}: ColumnProps) {
  const [adding, setAdding] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [dragOver, setDragOver] = useState(false)

  function reset() {
    setNewTitle("")
    setNewDescription("")
    setAdding(false)
  }

  return (
    <section
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node))
          setDragOver(false)
      }}
      onDrop={(e) => {
        e.preventDefault()
        setDragOver(false)
        const taskId = e.dataTransfer.getData("text/plain")
        if (taskId) onDropTask(taskId)
      }}
      onDropCapture={() => setDragOver(false)}
      className={cn(
        "flex min-h-72 flex-col overflow-hidden rounded-2xl border-2 border-foreground bg-card shadow-brutal transition-colors",
        dragOver && "border-dashed bg-muted"
      )}
    >
      <header
        className={cn(
          "flex items-center justify-between border-b-2 border-foreground px-4 py-3 text-primary-foreground",
          accent
        )}
      >
        <h2 className="text-base font-bold tracking-tight">{title}</h2>
        <span className="min-w-7 rounded-full border-2 border-foreground bg-card px-2 text-center text-xs font-bold text-card-foreground">
          {count}
        </span>
      </header>

      <div className="flex flex-1 flex-col gap-3 p-3">{children}</div>

      {adding ? (
        <form
          className="flex flex-col gap-2 p-3 pt-0"
          onSubmit={(e) => {
            e.preventDefault()
            const trimmed = newTitle.trim()
            if (!trimmed) return
            onAdd(trimmed, newDescription.trim() || undefined)
            reset()
          }}
          onKeyDown={(e) => e.key === "Escape" && reset()}
        >
          <input
            autoFocus
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Task title"
            className="rounded-lg border-2 border-foreground bg-card px-3 py-2 text-sm shadow-brutal-sm transition-shadow outline-none placeholder:text-muted-foreground focus-visible:shadow-brutal focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            aria-label="New task title"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            rows={2}
            placeholder="Description (optional)"
            className="resize-none rounded-lg border-2 border-foreground bg-card px-3 py-2 text-xs shadow-brutal-sm transition-shadow outline-none placeholder:text-muted-foreground focus-visible:shadow-brutal focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            aria-label="New task description"
          />
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
        <Button
          variant="outline"
          className="mx-3 mb-3 justify-start border-dashed shadow-none hover:border-solid"
          onClick={() => setAdding(true)}
        >
          <Plus data-icon="inline-start" />
          Add task
        </Button>
      )}
    </section>
  )
}
