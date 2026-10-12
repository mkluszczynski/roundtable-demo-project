"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Task } from "@/lib/kanban/types"
import { cn } from "@/lib/utils"

type TaskCardProps = {
  task: Task
  canMoveLeft: boolean
  canMoveRight: boolean
  onMoveLeft: () => void
  onMoveRight: () => void
  onUpdate: (changes: { title: string; description?: string }) => void
  onDelete: () => void
  onDropBefore: (draggedId: string) => void
}

export function TaskCard({
  task,
  canMoveLeft,
  canMoveRight,
  onMoveLeft,
  onMoveRight,
  onUpdate,
  onDelete,
  onDropBefore,
}: TaskCardProps) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description ?? "")
  const [dragging, setDragging] = useState(false)

  function save() {
    const trimmed = title.trim()
    if (!trimmed) return
    onUpdate({ title: trimmed, description: description.trim() || undefined })
    setEditing(false)
  }

  function cancel() {
    setTitle(task.title)
    setDescription(task.description ?? "")
    setEditing(false)
  }

  if (editing) {
    return (
      <form
        className="flex flex-col gap-2 rounded-lg border bg-card p-3 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault()
          save()
        }}
        onKeyDown={(e) => e.key === "Escape" && cancel()}
      >
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-md border bg-background px-2 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
          aria-label="Task title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Description (optional)"
          className="resize-none rounded-md border bg-background px-2 py-1 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
          aria-label="Task description"
        />
        <div className="flex justify-end gap-1">
          <Button type="button" variant="ghost" size="sm" onClick={cancel}>
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={!title.trim()}>
            Save
          </Button>
        </div>
      </form>
    )
  }

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", task.id)
        e.dataTransfer.effectAllowed = "move"
        setDragging(true)
      }}
      onDragEnd={() => setDragging(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()
        e.stopPropagation()
        const draggedId = e.dataTransfer.getData("text/plain")
        if (draggedId) onDropBefore(draggedId)
      }}
      className={cn(
        "group flex cursor-grab flex-col gap-1 rounded-lg border bg-card p-3 shadow-sm transition-opacity active:cursor-grabbing",
        dragging && "opacity-40"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium break-words">{task.title}</p>
        <div className="flex shrink-0 gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <Button variant="ghost" size="icon-xs" onClick={() => setEditing(true)} aria-label="Edit task">
            <Pencil />
          </Button>
          <Button variant="ghost" size="icon-xs" onClick={onDelete} aria-label="Delete task">
            <Trash2 />
          </Button>
        </div>
      </div>
      {task.description && (
        <p className="text-xs whitespace-pre-wrap text-muted-foreground">{task.description}</p>
      )}
      <div className="mt-1 flex justify-between">
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onMoveLeft}
          disabled={!canMoveLeft}
          aria-label="Move to previous column"
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onMoveRight}
          disabled={!canMoveRight}
          aria-label="Move to next column"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
