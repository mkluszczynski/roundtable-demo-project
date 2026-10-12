"use client"

import { Column } from "@/components/kanban/column"
import { TaskCard } from "@/components/kanban/task-card"
import { useTasks } from "@/hooks/use-tasks"
import { COLUMNS, type ColumnId } from "@/lib/kanban/types"

const COLUMN_ACCENTS: Record<ColumnId, string> = {
  todo: "bg-nb-yellow",
  "in-progress": "bg-nb-purple",
  done: "bg-nb-teal",
}

export function Board() {
  const { tasks, hydrated, addTask, updateTask, deleteTask, moveTask } =
    useTasks()

  return (
    <div className="grid gap-5 rounded-3xl border-2 border-foreground bg-nb-pink/40 p-4 shadow-brutal-lg md:grid-cols-3 md:p-6 dark:bg-muted">
      {COLUMNS.map((column, columnIndex) => {
        const columnTasks = tasks.filter((t) => t.status === column.id)
        const prev = COLUMNS[columnIndex - 1]
        const next = COLUMNS[columnIndex + 1]

        return (
          <Column
            key={column.id}
            title={column.title}
            accent={COLUMN_ACCENTS[column.id]}
            count={columnTasks.length}
            onAdd={(title, description) =>
              addTask(column.id, title, description)
            }
            onDropTask={(taskId) => moveTask(taskId, column.id)}
          >
            {hydrated &&
              columnTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  canMoveLeft={!!prev}
                  canMoveRight={!!next}
                  onMoveLeft={() => prev && moveTask(task.id, prev.id)}
                  onMoveRight={() => next && moveTask(task.id, next.id)}
                  onUpdate={(changes) => updateTask(task.id, changes)}
                  onDelete={() => deleteTask(task.id)}
                  onDropBefore={(draggedId) =>
                    moveTask(draggedId, column.id, task.id)
                  }
                />
              ))}
          </Column>
        )
      })}
    </div>
  )
}
