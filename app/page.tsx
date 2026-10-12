import { Sparkles } from "lucide-react"

import { Board } from "@/components/kanban/board"
import { cn } from "@/lib/utils"

const DOTS = [
  "bg-nb-coral",
  "bg-nb-purple",
  "bg-nb-teal",
  "bg-nb-yellow",
  "bg-nb-blue",
  "bg-nb-orange",
]

const BADGES = [
  { label: "Saved in this browser", className: "bg-card" },
  { label: "Drag & drop", className: "bg-nb-purple text-primary-foreground" },
  {
    label: "Press d for dark mode",
    className: "bg-nb-yellow text-primary-foreground",
  },
]

export default function Page() {
  return (
    <main className="mx-auto flex min-h-svh max-w-6xl flex-col gap-8 p-4 md:p-8">
      <header className="flex flex-col gap-5 pt-4">
        <div aria-hidden className="flex gap-2">
          {DOTS.map((dot) => (
            <span
              key={dot}
              className={cn(
                "size-4 rounded-full border-2 border-foreground",
                dot
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-xl border-2 border-foreground bg-nb-coral text-primary-foreground shadow-brutal">
            <Sparkles className="size-7" />
          </span>
          <div>
            <h1 className="text-4xl leading-none font-bold tracking-tight md:text-5xl">
              Kanban
            </h1>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              Bold borders · Hard shadows · Getting things done
            </p>
          </div>
        </div>
        <ul className="flex flex-wrap gap-2">
          {BADGES.map((badge) => (
            <li
              key={badge.label}
              className={cn(
                "rounded-full border-2 border-foreground px-3 py-1 text-xs font-semibold shadow-brutal-sm",
                badge.className
              )}
            >
              {badge.label}
            </li>
          ))}
        </ul>
      </header>
      <Board />
    </main>
  )
}
