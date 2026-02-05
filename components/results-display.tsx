"use client"

import { cn } from "@/lib/utils"
import { calculateResults, getResultLevel, categoryLabels } from "@/lib/adhd-questions"
import { AlertTriangle, Brain, Zap, Activity, RefreshCw, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResultsDisplayProps {
  answers: Record<number, number>
  onRestart: () => void
}

export function ResultsDisplay({ answers, onRestart }: ResultsDisplayProps) {
  const results = calculateResults(answers)
  const resultLevel = getResultLevel(results.percentage)
  
  const categoryIcons = {
    inattention: Brain,
    hyperactivity: Activity,
    impulsivity: Zap
  }

  return (
    <div className="space-y-8">
      {/* 主要结果卡片 */}
      <div className="bg-card rounded-2xl p-8 border border-border text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">测试结果</h2>
        
        <div className="relative inline-flex items-center justify-center mb-6">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-secondary"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              className={resultLevel.color}
              strokeDasharray={`${results.percentage * 4.4} 440`}
              style={{ transition: "stroke-dasharray 1s ease-out" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn("text-4xl font-bold", resultLevel.color)}>
              {results.percentage}%
            </span>
            <span className="text-sm text-muted-foreground">综合得分</span>
          </div>
        </div>
        
        <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4", resultLevel.bgColor)}>
          <span className={cn("font-semibold", resultLevel.color)}>{resultLevel.level}风险</span>
        </div>
        
        <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
          {resultLevel.description}
        </p>
      </div>

      {/* 分类得分 */}
      <div className="grid gap-4 md:grid-cols-3">
        {(Object.keys(results.categories) as Array<keyof typeof results.categories>).map((category) => {
          const Icon = categoryIcons[category]
          const categoryResult = results.categories[category]
          
          return (
            <div key={category} className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">
                  {categoryLabels[category]}
                </h3>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">得分</span>
                  <span className="font-medium text-foreground">
                    {categoryResult.score} / {categoryResult.max}
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${categoryResult.percentage}%` }}
                  />
                </div>
              </div>
              
              <div className="text-2xl font-bold text-primary">
                {categoryResult.percentage}%
              </div>
            </div>
          )
        })}
      </div>

      {/* 免责声明 */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h4 className="font-semibold text-amber-400 mb-2">重要提示</h4>
            <p className="text-sm text-amber-200/80 leading-relaxed">
              本测试仅为自我筛查工具，不能替代专业医学诊断。ADHD的诊断需要由具有资质的精神科医生或心理健康专家根据全面的临床评估做出。如果您对测试结果有任何疑虑，请及时寻求专业帮助。
            </p>
          </div>
        </div>
      </div>

      {/* 建议 */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/20">
            <Info className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">下一步建议</h3>
        </div>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            如有需要，预约精神科医生或心理咨询师进行专业评估
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            了解ADHD相关知识，关注自身注意力和行为模式
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            建立规律的作息和时间管理习惯
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            保持良好的身心健康，适度运动和充足睡眠
          </li>
        </ul>
      </div>

      {/* 重新测试按钮 */}
      <div className="text-center">
        <Button 
          onClick={onRestart}
          size="lg"
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          重新测试
        </Button>
      </div>
    </div>
  )
}
