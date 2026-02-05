"use client"

import { useState } from "react"
import { ADHDTest } from "@/components/adhd-test"
import { Button } from "@/components/ui/button"
import { Brain, Shield, Clock, ArrowRight, CheckCircle2 } from "lucide-react"

export default function Home() {
  const [started, setStarted] = useState(false)

  if (started) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* 头部 */}
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm mb-4">
              <Brain className="w-4 h-4" />
              ADHD 自测评估
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              注意力缺陷多动障碍筛查
            </h1>
            <p className="text-muted-foreground">
              请根据您过去6个月的实际情况作答
            </p>
          </header>
          
          {/* 测试组件 */}
          <ADHDTest />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero 部分 */}
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm mb-6">
            <Brain className="w-4 h-4" />
            专业ADHD自测工具
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            了解您的注意力状态
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed text-pretty">
            通过科学设计的评估问卷，帮助您更好地了解自己是否存在注意力缺陷多动障碍（ADHD）的相关症状。
          </p>
          
          <Button 
            size="lg" 
            onClick={() => setStarted(true)}
            className="gap-2 text-base px-8 py-6"
          >
            开始测试
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* 特点卡片 */}
        <div className="grid gap-4 md:grid-cols-3 mb-16">
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">快速完成</h3>
            <p className="text-sm text-muted-foreground">
              仅需5-10分钟即可完成全部18道评估题目
            </p>
          </div>
          
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">隐私保护</h3>
            <p className="text-sm text-muted-foreground">
              所有数据仅存储在您的设备上，不会上传服务器
            </p>
          </div>
          
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">科学评估</h3>
            <p className="text-sm text-muted-foreground">
              基于DSM-5诊断标准设计，涵盖三大核心症状维度
            </p>
          </div>
        </div>

        {/* 关于ADHD */}
        <div className="bg-card rounded-2xl p-8 border border-border mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">什么是ADHD？</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            注意力缺陷多动障碍（ADHD）是一种常见的神经发育障碍，主要特征包括注意力难以集中、多动和冲动行为。ADHD不仅影响儿童，也会持续到成年期，对学业、工作和人际关系产生显著影响。
          </p>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-secondary/50">
              <h4 className="font-semibold text-foreground mb-2">注意力不集中</h4>
              <p className="text-sm text-muted-foreground">
                难以保持专注、容易分心、组织能力差、健忘
              </p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50">
              <h4 className="font-semibold text-foreground mb-2">多动</h4>
              <p className="text-sm text-muted-foreground">
                坐立不安、无法安静、内心焦躁、停不下来
              </p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50">
              <h4 className="font-semibold text-foreground mb-2">冲动</h4>
              <p className="text-sm text-muted-foreground">
                打断他人、难以等待、仓促决定、缺乏耐心
              </p>
            </div>
          </div>
        </div>

        {/* 测试说明 */}
        <div className="bg-card rounded-2xl p-8 border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">测试说明</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                本测试共包含18道题目，涵盖注意力、多动和冲动三个维度
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                请根据您在过去6个月中的实际表现进行评估
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                每道题有4个选项：从不、偶尔、经常、总是
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                测试结果仅供参考，不能替代专业医学诊断
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="border-t border-border py-8 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="mb-2">
            本测试仅为自我筛查工具，不构成医学诊断依据。
          </p>
          <p>
            如有疑虑，请咨询专业精神科医生或心理健康专家。
          </p>
        </div>
      </footer>
    </main>
  )
}
