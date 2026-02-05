"use client"

import { useState, useCallback } from "react"
import { questions } from "@/lib/adhd-questions"
import { QuestionCard } from "@/components/question-card"
import { ProgressBar } from "@/components/progress-bar"
import { ResultsDisplay } from "@/components/results-display"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"

export function ADHDTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [currentPage, setCurrentPage] = useState(0)
  const [showResults, setShowResults] = useState(false)
  
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

  const handleAnswerSelect = useCallback((questionId: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }))
  }, [])

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

  return (
    <div className="space-y-6">
      {/* 进度条 */}
      <ProgressBar current={answeredCount} total={questions.length} />
      
      {/* 问题列表 */}
      <div className="space-y-4">
        {currentQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            selectedAnswer={answers[question.id]}
            onAnswerSelect={handleAnswerSelect}
          />
        ))}
      </div>
      
      {/* 导航按钮 */}
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
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentPage
                  ? "bg-primary w-6"
                  : "bg-secondary hover:bg-muted-foreground"
              }`}
              aria-label={`转到第 ${index + 1} 页`}
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
      
      {/* 提示信息 */}
      {!currentPageAnswered && (
        <p className="text-center text-sm text-muted-foreground">
          请回答当前页面所有问题后继续
        </p>
      )}
    </div>
  )
}
