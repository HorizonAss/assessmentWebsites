"use client"

import { useState } from "react"
import { ADHDTest } from "@/components/adhd-test"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Shield,
  Clock,
  ArrowRight,
  CheckCircle2,
  FileText,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const [started, setStarted] = useState(false)

  if (started) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Top bar */}
          <div className="flex justify-end mb-6">
            <ThemeToggle />
          </div>
          {/* Header */}
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-muted-foreground text-sm mb-4 font-mono">
              <Brain className="w-4 h-4" />
              ASRS v1.1
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2 text-balance">
              成人ADHD自评量表
            </h1>
            <p className="text-muted-foreground">
              请根据您过去6个月的实际情况作答
            </p>
          </header>

          {/* Test */}
          <ADHDTest />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        {/* Top bar */}
        <div className="flex justify-end mb-10">
          <ThemeToggle />
        </div>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-muted-foreground text-sm mb-8 font-mono tracking-wide">
            <FileText className="w-4 h-4" />
            ASRS v1.1 -- WHO
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance tracking-[0.03em] border-0 leading-[4rem]">
            ADHD
            <br />
            自评量表
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed text-pretty">
            世界卫生组织（WHO）成人ADHD自评量表，由18道基于DSM-IV-TR标准的症状检查题目组成，帮助您了解自身是否存在注意力缺陷多动障碍的相关症状。
          </p>

          <Button
            size="lg"
            onClick={() => setStarted(true)}
            className="gap-2 text-base px-8 py-6"
          >
            开始评估
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Features */}
        <div className="grid gap-4 md:grid-cols-3 mb-20">
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">5 分钟完成</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              18道标准化题目，每题5个频率选项，快速作答
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">完全离线</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              所有数据仅在您的浏览器中处理，不上传任何服务器
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center mb-4">
              <Brain className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">WHO 标准</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              由 WHO 与哈佛、纽约大学精神科专家联合开发
            </p>
          </div>
        </div>

        {/* About ASRS */}
        <div className="bg-card rounded-2xl p-8 border border-border mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            关于 ASRS v1.1
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            成人ADHD自评量表（ASRS
            v1.1）是世界卫生组织与成人ADHD工作组联合开发的标准化筛查工具。量表分为两部分：Part
            A 包含6道最具预测性的核心筛查题目，Part B
            包含12道补充题目提供额外症状线索。
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-5 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2 font-mono text-sm tracking-wide">
                Part A -- 筛查项
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                6道核心题目。若4项或以上的回答落入临床显著区域（深色阴影列），则症状与成人ADHD高度一致，建议进一步评估。
              </p>
            </div>
            <div className="p-5 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2 font-mono text-sm tracking-wide">
                Part B -- 补充项
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                12道补充题目。不计算总分或诊断概率，但深色阴影区域的回答可作为症状进一步探查的线索。
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-card rounded-2xl p-8 border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">作答说明</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-foreground/40 mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                共18道题目：Part A（6题筛查项）+ Part B（12题补充项）
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-foreground/40 mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                请根据您在过去6个月中的感受和行为表现进行评估
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-foreground/40 mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                每道题有5个选项：从不 / 很少 / 有时 / 经常 / 非常频繁
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-foreground/40 mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                结果仅供参考，不能替代专业医学诊断。如有疑虑请咨询精神科医生
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="mb-2">
            基于 WHO Adult ADHD Self-Report Scale (ASRS-v1.1) Symptom Checklist
          </p>
          <p className="text-xs text-muted-foreground/60">
            Developed by Lenard Adler (NYU), Ronald C. Kessler (Harvard),
            Thomas Spencer (Harvard)
          </p>
        </div>
      </footer>
    </main>
  )
}
