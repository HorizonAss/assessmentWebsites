"use client"

import { cn } from "@/lib/utils"
import { answerOptions, partLabels, type Question } from "@/lib/adhd-questions"

interface QuestionCardProps {
  question: Question
  selectedAnswer: number | undefined
  onAnswerSelect: (questionId: number, value: number) => void
}

export function QuestionCard({
  question,
  selectedAnswer,
  onAnswerSelect,
}: QuestionCardProps) {
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
      </div>

      <h3 className="text-lg font-medium text-foreground mb-6 leading-relaxed">
        {question.text}
      </h3>

      <div className="grid grid-cols-5 gap-2">
        {answerOptions.map((option) => {
          const isShaded = option.value >= question.threshold
          const isSelected = selectedAnswer === option.value

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onAnswerSelect(question.id, option.value)}
              className={cn(
                "relative p-3 rounded-lg border transition-all duration-200 text-center",
                "hover:border-foreground/40",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                isSelected
                  ? "border-foreground bg-foreground text-primary-foreground"
                  : isShaded
                    ? "border-border bg-foreground/5 text-foreground"
                    : "border-border text-foreground"
              )}
            >
              <div className="text-sm font-medium">{option.label}</div>
              {isShaded && !isSelected && (
                <div className="absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full bg-foreground/25" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
