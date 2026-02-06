"use client"

import { useState, useCallback, useMemo } from "react"
import { questions, pickReversedIds } from "@/lib/adhd-questions"
import { QuestionCard } from "@/components/question-card"
import { ProgressBar } from "@/components/progress-bar"
import { ResultsDisplay } from "@/components/results-display"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"

export function ADHDTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [currentPage, setCurrentPage] = useState(0)
  const [showResults, setShowResults] = useState(false)

  // Generate a stable seed once per mount → deterministic set of reversed questions
  const reversedIds = useMemo(() => pickReversedIds(Date.now()), [])

  const questionsPerPage = 3
  const totalPages = Math.ceil(questions.length / questionsPerPage)

  const currentQuestions = questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  )

  const answeredCount = Object.keys(answers).length
  const allAnswered = answeredCount === questions.length

  const currentPageAnswered = currentQuestions.every(
    (q) => answers[q.id] !== undefined
  )

  const handleAnswerSelect = useCallback(
    (questionId: number, value: number) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: value,
      }))
    },
    []
  )

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleSubmit = () => {
    if (allAnswered) {
      setShowResults(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleRestart = () => {
    setAnswers({})
    setCurrentPage(0)
    setShowResults(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (showResults) {
    return <ResultsDisplay answers={answers} onRestart={handleRestart} />
  }

  // Determine if the current page is transitioning between Part A and B
  const currentPart = currentQuestions[0]?.part
  const isPartTransition =
    currentPage > 0 &&
    questions[(currentPage - 1) * questionsPerPage]?.part !== currentPart

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <ProgressBar current={answeredCount} total={questions.length} />

      {/* Part indicator */}
      {(currentPage === 0 || isPartTransition) && (
        <div className="text-center py-2">
          <span className="inline-block text-xs font-mono tracking-widest text-muted-foreground uppercase border border-border px-4 py-2 rounded-full">
            {currentPart === "A"
              ? "Part A -- 核心筛查项"
              : "Part B -- 补充评估项"}
          </span>
        </div>
      )}

      {/* Question cards */}
      <div className="space-y-4">
        {currentQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            selectedAnswer={answers[question.id]}
            onAnswerSelect={handleAnswerSelect}
            isReversed={reversedIds.has(question.id)}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className="gap-2 bg-transparent"
        >
          <ChevronLeft className="w-4 h-4" />
          上一页
        </Button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentPage(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? "bg-foreground w-6"
                  : "bg-border hover:bg-muted-foreground w-2"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        {currentPage === totalPages - 1 ? (
          <Button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            查看结果
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!currentPageAnswered}
            className="gap-2"
          >
            下一页
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Hint */}
      {!currentPageAnswered && (
        <p className="text-center text-sm text-muted-foreground">
          请回答当前页面所有问题后继续
        </p>
      )}
    </div>
  )
}
