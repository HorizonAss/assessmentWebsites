"use client"

import {
  questions,
  calculateResults,
  getScreeningResult,
} from "@/lib/adhd-questions"
import {
  AlertTriangle,
  RefreshCw,
  Info,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResultsDisplayProps {
  answers: Record<number, number>
  onRestart: () => void
}

export function ResultsDisplay({ answers, onRestart }: ResultsDisplayProps) {
  const results = calculateResults(answers)
  const screening = getScreeningResult(results.partA.shadedCount)

  return (
    <div className="space-y-8">
      {/* Part A Screening Result */}
      <div className="bg-card rounded-2xl p-8 border border-border text-center">
        <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-4">
          ASRS v1.1 Screening Result
        </p>
        <h2 className="text-3xl font-bold text-foreground mb-6">
          {screening.level}
        </h2>

        <div className="relative inline-flex items-center justify-center mb-8">
          <svg className="w-44 h-44 transform -rotate-90" aria-hidden="true">
            <circle
              cx="88"
              cy="88"
              r="76"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
              className="text-border"
            />
            <circle
              cx="88"
              cy="88"
              r="76"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              className={
                results.percentage >= 55
                  ? "text-red-500"
                  : results.percentage >= 30
                    ? "text-foreground/60"
                    : "text-blue-500"
              }
              strokeDasharray={`${results.percentage * 4.78} 478`}
              style={{ transition: "stroke-dasharray 1s ease-out" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-foreground tabular-nums">
              {results.totalScore}
            </span>
            <span className="text-sm text-muted-foreground">
              / {results.maxScore}
            </span>
          </div>
        </div>

        <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
          {screening.description}
        </p>
      </div>

      {/* Part A Detail */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold text-foreground text-lg">
              Part A - 筛查项
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              6道核心筛查题目中落入显著区域的数量
            </p>
          </div>
          <div className="flex items-center gap-2">
            {results.partA.isHighlyConsistent ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-full">
                <AlertTriangle className="w-3.5 h-3.5" />
                高度一致
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full">
                <CheckCircle className="w-3.5 h-3.5" />
                未达阈值
              </span>
            )}
          </div>
        </div>

        <div className="flex items-end gap-3 mb-4">
          {Array.from({ length: 6 }).map((_, i) => {
            const isFilled = i < results.partA.shadedCount
            const isThreshold = i === 3
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className={`w-full rounded-md transition-all duration-500 ${
                    isFilled
                      ? results.partA.isHighlyConsistent
                        ? "bg-red-500"
                        : "bg-blue-500"
                      : "bg-border"
                  }`}
                  style={{
                    height: `${(i + 1) * 12 + 20}px`,
                    transitionDelay: `${i * 100}ms`,
                  }}
                />
                {isThreshold && (
                  <span className="text-[10px] font-mono text-muted-foreground">
                    阈值
                  </span>
                )}
              </div>
            )
          })}
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            显著标记：{results.partA.shadedCount} /{" "}
            {results.partA.totalQuestions}
          </span>
          <span className="text-muted-foreground font-mono">
            得分 {results.partA.score} / {results.partA.max}
          </span>
        </div>
      </div>

      {/* Part B Detail */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold text-foreground text-lg">
              Part B - 补充项
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              12道补充题目提供额外症状线索
            </p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">得分</span>
            <span className="font-mono text-foreground">
              {results.partB.score} / {results.partB.max}
            </span>
          </div>
          <div className="h-2.5 bg-border rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-700 ease-out rounded-full ${
                results.partB.score / results.partB.max > 0.5
                  ? "bg-red-400"
                  : "bg-blue-400"
              }`}
              style={{
                width: `${(results.partB.score / results.partB.max) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            显著标记：{results.partB.shadedCount} /{" "}
            {results.partB.totalQuestions}
          </span>
          <span className="text-muted-foreground">
            {Math.round((results.partB.score / results.partB.max) * 100)}%
          </span>
        </div>
      </div>

      {/* Per-question breakdown */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="font-semibold text-foreground text-lg mb-4">逐题详情</h3>
        <div className="space-y-0 divide-y divide-border">
          {questions.map((q) => {
            const answer = answers[q.id] ?? 0
            const isShaded = answer >= q.threshold
            return (
              <div key={q.id} className="flex items-center gap-4 py-3">
                <span className="text-xs font-mono text-muted-foreground w-6 shrink-0">
                  {q.id}.
                </span>
                <span className="flex-1 text-sm text-foreground/80 line-clamp-1">
                  {q.text}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-mono text-foreground">
                    {answer}/4
                  </span>
                  {isShaded ? (
                    <XCircle className="w-4 h-4 text-red-500/70" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-blue-400/50" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border border-border rounded-xl p-6 bg-muted">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">重要提示</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              本量表基于 WHO
              成人ADHD自评量表（ASRS
              v1.1），仅为自我筛查工具，不能替代专业医学诊断。ADHD的诊断需要由具有资质的精神科医生或心理健康专家根据全面的临床评估做出。如果您对测试结果有任何疑虑，请及时寻求专业帮助。
            </p>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <Info className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold text-foreground">下一步建议</h3>
        </div>
        <ul className="space-y-3 text-muted-foreground text-sm">
          <li className="flex items-start gap-2">
            <span className="text-foreground/40 mt-0.5">--</span>
            如有需要，预约精神科医生或心理咨询师进行专业评估
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground/40 mt-0.5">--</span>
            了解ADHD相关知识，关注自身注意力和行为模式
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground/40 mt-0.5">--</span>
            建立规律的作息和时间管理习惯
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground/40 mt-0.5">--</span>
            保持良好的身心健康，适度运动和充足睡眠
          </li>
        </ul>
      </div>

      {/* Restart */}
      <div className="text-center pb-8">
        <Button onClick={onRestart} size="lg" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          重新测试
        </Button>
      </div>
    </div>
  )
}
