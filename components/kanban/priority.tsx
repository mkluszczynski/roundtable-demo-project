import { PRIORITIES, type Priority } from "@/lib/kanban/types"
import { cn } from "@/lib/utils"

const PRIORITY_STYLES: Record<Priority, string> = {
  low: "bg-nb-teal",
  medium: "bg-nb-yellow",
  high: "bg-nb-coral",
}

type PrioritySelectProps = {
  value: Priority
  onChange: (priority: Priority) => void
  "aria-label": string
}

export function PrioritySelect({
  value,
  onChange,
  "aria-label": ariaLabel,
}: PrioritySelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Priority)}
      className="rounded-lg border-2 border-foreground bg-card px-3 py-2 text-xs font-medium shadow-brutal-sm transition-shadow outline-none focus-visible:shadow-brutal focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
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
        "w-fit rounded-full border-2 border-foreground px-2 py-0.5 text-[10px] font-bold tracking-wide text-primary-foreground uppercase",
        PRIORITY_STYLES[priority]
      )}
    >
      {label}
    </span>
  )
}
