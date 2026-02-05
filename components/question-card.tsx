"use client"

import { cn } from "@/lib/utils"
import { answerOptions, categoryLabels, type Question } from "@/lib/adhd-questions"

interface QuestionCardProps {
  question: Question
  selectedAnswer: number | undefined
  onAnswerSelect: (questionId: number, value: number) => void
}

export function QuestionCard({ question, selectedAnswer, onAnswerSelect }: QuestionCardProps) {
  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/20 text-primary">
          {categoryLabels[question.category]}
        </span>
        <span className="text-xs text-muted-foreground">
          问题 {question.id} / 18
        </span>
      </div>
      
      <h3 className="text-lg font-medium text-foreground mb-6">
        {question.text}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {answerOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onAnswerSelect(question.id, option.value)}
            className={cn(
              "p-4 rounded-lg border-2 transition-all duration-200 text-left",
              "hover:border-primary/50 hover:bg-primary/5",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
              selectedAnswer === option.value
                ? "border-primary bg-primary/10"
                : "border-border bg-secondary/30"
            )}
          >
            <div className="font-semibold text-foreground">{option.label}</div>
            <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
