"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react"

import { fieldClassName, PriorityBadge, PrioritySelect } from "@/components/kanban/priority"
import { Button } from "@/components/ui/button"
import type { Priority, Task } from "@/lib/kanban/types"
import { cn } from "@/lib/utils"

type TaskCardProps = {
  task: Task
  canMoveLeft: boolean
  canMoveRight: boolean
  onMoveLeft: () => void
  onMoveRight: () => void
  onUpdate: (changes: { title: string; description?: string; priority: Priority }) => void
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
  const [priority, setPriority] = useState(task.priority)
  const [dragging, setDragging] = useState(false)

  function save() {
    const trimmed = title.trim()
    if (!trimmed) return
    onUpdate({ title: trimmed, description: description.trim() || undefined, priority })
    setEditing(false)
  }

  function cancel() {
    setTitle(task.title)
    setDescription(task.description ?? "")
    setPriority(task.priority)
    setEditing(false)
  }

  if (editing) {
    return (
      <form
        className="flex flex-col gap-2.5 rounded-xl border-2 border-foreground bg-card p-3 shadow-brutal"
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
          className={cn(fieldClassName, "text-sm")}
          aria-label="Task title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Description (optional)"
          className={cn(fieldClassName, "resize-none text-xs")}
          aria-label="Task description"
        />
        <PrioritySelect value={priority} onChange={setPriority} aria-label="Task priority" />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" size="sm" onClick={cancel}>
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
        "group flex cursor-grab flex-col gap-2 rounded-xl border-2 border-foreground bg-card p-3 shadow-brutal-sm transition-all hover:-translate-x-px hover:-translate-y-px hover:shadow-brutal active:cursor-grabbing",
        dragging && "rotate-2 opacity-40"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-bold break-words">{task.title}</p>
        <div className="flex shrink-0 gap-1.5 transition-opacity focus-within:opacity-100 md:opacity-0 md:group-hover:opacity-100">
          <Button variant="warning" size="icon-xs" onClick={() => setEditing(true)} aria-label="Edit task">
            <Pencil />
          </Button>
          <Button variant="destructive" size="icon-xs" onClick={onDelete} aria-label="Delete task">
            <Trash2 />
          </Button>
        </div>
      </div>
      <PriorityBadge priority={task.priority} />
      {task.description && (
        <p className="text-xs whitespace-pre-wrap text-muted-foreground">{task.description}</p>
      )}
      <div className="mt-1 flex justify-between">
        <Button
          variant="outline"
          size="icon-xs"
          onClick={onMoveLeft}
          disabled={!canMoveLeft}
          aria-label="Move to previous column"
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
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
