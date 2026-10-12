import { Board } from "@/components/kanban/board"

export default function Page() {
  return (
    <main className="mx-auto flex min-h-svh max-w-6xl flex-col gap-6 p-4 md:p-8">
      <header className="flex items-baseline justify-between gap-4">
        <h1 className="text-xl font-semibold">Kanban</h1>
        <p className="font-mono text-xs text-muted-foreground">
          Saved in this browser · press <kbd>d</kbd> for dark mode
        </p>
      </header>
      <Board />
    </main>
  )
}
