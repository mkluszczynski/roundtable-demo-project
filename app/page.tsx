import { Sparkles, Star } from "lucide-react"

import { Board } from "@/components/kanban/board"
import { ThemeToggle } from "@/components/theme-toggle"

const SWATCHES = [
  "bg-nb-red",
  "bg-nb-violet",
  "bg-nb-teal",
  "bg-nb-yellow",
  "bg-nb-blue",
  "bg-nb-orange",
]

function Decorations() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
    >
      <div className="absolute -top-0.5 -right-0.5 h-64 w-72 rounded-bl-[3rem] border-b-2 border-l-2 border-foreground bg-nb-yellow" />
      <div className="absolute -bottom-0.5 -left-0.5 h-56 w-56 rounded-tr-[3rem] border-t-2 border-r-2 border-foreground bg-nb-pink" />
      <Star className="absolute top-10 left-[30%] size-5 fill-nb-yellow" />
      <Star className="absolute bottom-8 left-[55%] size-4 fill-nb-red" />
      <Sparkles className="absolute top-24 right-[32%] size-5" />
      <span className="absolute top-36 left-6 size-4 rotate-12 border-2 border-foreground bg-nb-orange" />
      <span className="absolute top-14 right-80 size-3.5 -rotate-12 border-2 border-foreground bg-nb-blue" />
      <span className="absolute right-12 bottom-10 size-4 rotate-12 border-2 border-foreground bg-nb-yellow" />
      <span className="absolute bottom-24 left-[42%] size-3 rotate-45 border-2 border-foreground bg-nb-teal" />
    </div>
  )
}

export default function Page() {
  return (
    <main className="mx-auto min-h-svh max-w-6xl p-4 md:p-8">
      <div className="relative isolate flex flex-col gap-8 overflow-hidden rounded-3xl border-2 border-foreground bg-background p-4 shadow-brutal-lg md:p-10">
        <Decorations />

        <header className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            {SWATCHES.map((swatch) => (
              <span
                key={swatch}
                aria-hidden
                className={`size-4 rounded-full border-2 border-foreground ${swatch}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="grid size-14 shrink-0 place-items-center rounded-xl border-2 border-foreground bg-nb-red text-nb-ink shadow-brutal">
              <Sparkles className="size-7" />
            </div>
            <div>
              <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
                Kanban
              </h1>
              <p className="text-lg font-medium text-muted-foreground">
                Bold tasks · Hard shadows · Done right
              </p>
            </div>
            <ThemeToggle className="ml-auto self-start" />
          </div>

          <ul className="flex flex-wrap gap-2 text-xs font-semibold text-nb-ink">
            <li className="rounded-full border-2 border-foreground bg-card px-3 py-1 text-foreground shadow-brutal-sm">
              Saved in this browser
            </li>
            <li className="rounded-full border-2 border-foreground bg-nb-violet px-3 py-1 shadow-brutal-sm">
              Drag &amp; drop
            </li>
            <li className="rounded-full border-2 border-foreground bg-nb-yellow px-3 py-1 shadow-brutal-sm">
              Press <kbd className="font-mono">d</kbd> for dark mode
            </li>
          </ul>
        </header>

        <Board />
      </div>
    </main>
  )
}
