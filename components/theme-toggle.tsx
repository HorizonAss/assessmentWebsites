"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-0.5 p-1 rounded-full border border-border bg-card">
        <div className="w-8 h-8 rounded-full" />
        <div className="w-8 h-8 rounded-full" />
        <div className="w-8 h-8 rounded-full" />
      </div>
    )
  }

  const options = [
    { value: "light", icon: Sun, label: "日间模式" },
    { value: "dark", icon: Moon, label: "夜间模式" },
    { value: "system", icon: Monitor, label: "跟随系统" },
  ] as const

  return (
    <div
      className="flex items-center gap-0.5 p-1 rounded-full border border-border bg-card"
      role="radiogroup"
      aria-label="主题切换"
    >
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={theme === value}
          aria-label={label}
          onClick={() => setTheme(value)}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
            theme === value
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  )
}
