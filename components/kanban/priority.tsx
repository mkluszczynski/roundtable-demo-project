import { PRIORITIES, type Priority } from "@/lib/kanban/types"
import { cn } from "@/lib/utils"

export const fieldClassName =
  "rounded-lg border-2 border-foreground bg-card px-2.5 py-1.5 text-foreground shadow-brutal-sm transition-all outline-none placeholder:text-muted-foreground focus-visible:-translate-x-px focus-visible:-translate-y-px focus-visible:shadow-brutal"

const PRIORITY_STYLES: Record<Priority, string> = {
  low: "bg-nb-teal",
  medium: "bg-nb-yellow",
  high: "bg-nb-red",
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
      className={cn(fieldClassName, "text-xs font-medium")}
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
        "w-fit rounded-full border-2 border-foreground px-2 py-0.5 text-[10px] font-bold tracking-wide text-nb-ink uppercase",
        PRIORITY_STYLES[priority]
      )}
    >
      {label}
    </span>
  )
}
