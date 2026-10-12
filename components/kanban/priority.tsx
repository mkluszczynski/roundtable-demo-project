import { PRIORITIES, type Priority } from "@/lib/kanban/types"
import { cn } from "@/lib/utils"

const PRIORITY_STYLES: Record<Priority, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  high: "bg-destructive/15 text-destructive",
}

type PrioritySelectProps = {
  value: Priority
  onChange: (priority: Priority) => void
  "aria-label": string
}

export function PrioritySelect({ value, onChange, "aria-label": ariaLabel }: PrioritySelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Priority)}
      className="rounded-md border bg-background px-2 py-1 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
      aria-label={ariaLabel}
    >
      {PRIORITIES.map((p) => (
        <option key={p.id} value={p.id}>
          {p.label} priority
        </option>
      ))}
    </select>
  )
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const label = PRIORITIES.find((p) => p.id === priority)?.label ?? priority
  return (
    <span
      className={cn(
        "w-fit rounded-full px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase",
        PRIORITY_STYLES[priority]
      )}
    >
      {label}
    </span>
  )
}
