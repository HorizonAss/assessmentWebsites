"use client"

import { cn } from "@/lib/utils"
import {
  answerOptions,
  reverseAnswerOptions,
  partLabels,
  type Question,
} from "@/lib/adhd-questions"

/**
 * Color mapping by display position (left → right, low → high saturation red):
 *   0: "从不"       — barely tinted, near-neutral
 *   1: "很少"       — light rose
 *   2: "有时"       — medium rose
 *   3: "经常"       — medium-strong red
 *   4: "非常频繁"   — saturated red (capped below destructive)
 */
const positionStyles = [
  {
    idle: "border-foreground/10 hover:border-foreground/20",
    active: "bg-rose-100 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-200",
    dot: "bg-foreground/15",
  },
  {
    idle: "border-rose-200/30 dark:border-rose-800/30 hover:border-rose-300/50 dark:hover:border-rose-700/50",
    active: "bg-rose-200 dark:bg-rose-900/70 border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-100",
    dot: "bg-rose-300/40",
  },
  {
    idle: "border-rose-300/25 dark:border-rose-700/25 hover:border-rose-300/45 dark:hover:border-rose-600/45",
    active: "bg-rose-300 dark:bg-rose-800/80 border-rose-400 dark:border-rose-600 text-rose-900 dark:text-rose-50",
    dot: "bg-rose-400/35",
  },
  {
    idle: "border-red-300/25 dark:border-red-700/25 hover:border-red-400/45 dark:hover:border-red-600/45",
    active: "bg-red-400 dark:bg-red-700/90 border-red-500 dark:border-red-500 text-white",
    dot: "bg-red-400/40",
  },
  {
    idle: "border-red-400/25 dark:border-red-600/25 hover:border-red-400/50 dark:hover:border-red-500/50",
    active: "bg-red-500/85 dark:bg-red-600/90 border-red-500 dark:border-red-500 text-white",
    dot: "bg-red-500/40",
  },
]

interface QuestionCardProps {
  question: Question
  selectedAnswer: number | undefined
  onAnswerSelect: (questionId: number, value: number) => void
  isReversed: boolean
}

export function QuestionCard({
  question,
  selectedAnswer,
  onAnswerSelect,
  isReversed,
}: QuestionCardProps) {
  const displayText = isReversed ? question.reverseText : question.text
  const options = isReversed ? reverseAnswerOptions : answerOptions

  return (
    <div className="bg-card rounded-xl p-6 border border-border transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <span
          className={cn(
            "text-xs font-mono tracking-wider px-2.5 py-1 rounded-full border",
            question.part === "A"
              ? "border-foreground/40 text-foreground"
              : "border-muted-foreground/40 text-muted-foreground"
          )}
        >
          {partLabels[question.part]}
        </span>
        <span className="text-xs text-muted-foreground font-mono">
          Q{question.id} / 18
        </span>
        {isReversed && (
          <span className="text-[11px] tracking-wide font-medium text-muted-foreground/70 px-2 py-0.5 rounded border border-dashed border-muted-foreground/30">
            反向计分
          </span>
        )}
      </div>

      <h3 className="text-lg font-medium text-foreground mb-6 leading-relaxed">
        {displayText}
      </h3>

      <div className="grid grid-cols-5 gap-2">
        {options.map((option, displayIndex) => {
          const isSelected = selectedAnswer === option.value
          const style = positionStyles[displayIndex]

          return (
            <button
              key={`${option.value}-${displayIndex}`}
              type="button"
              onClick={() => onAnswerSelect(question.id, option.value)}
              aria-pressed={isSelected}
              className={cn(
                "relative p-3 rounded-lg border transition-all duration-200 text-center",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                isSelected
                  ? cn(style.active, "shadow-sm")
                  : style.idle
              )}
            >
              <div className={cn("text-sm font-medium", !isSelected && "text-foreground")}>
                {option.label}
              </div>
              {!isSelected && (
                <div
                  className={cn(
                    "mx-auto mt-1.5 w-1.5 h-1.5 rounded-full",
                    style.dot
                  )}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
