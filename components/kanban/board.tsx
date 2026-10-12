"use client"

import { Column } from "@/components/kanban/column"
import { TaskCard } from "@/components/kanban/task-card"
import { useTasks } from "@/hooks/use-tasks"
import { COLUMNS } from "@/lib/kanban/types"

export function Board() {
  const { tasks, hydrated, addTask, updateTask, deleteTask, moveTask } = useTasks()

  return (
    <div className="grid items-start gap-6 md:grid-cols-3">
      {COLUMNS.map((column, columnIndex) => {
        const columnTasks = tasks.filter((t) => t.status === column.id)
        const prev = COLUMNS[columnIndex - 1]
        const next = COLUMNS[columnIndex + 1]

        return (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            count={columnTasks.length}
            onAdd={(title, description, priority) => addTask(column.id, title, description, priority)}
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
                  onDropBefore={(draggedId) => moveTask(draggedId, column.id, task.id)}
                />
              ))}
          </Column>
        )
      })}
    </div>
  )
}
