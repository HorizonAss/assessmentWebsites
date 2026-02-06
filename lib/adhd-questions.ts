export type QuestionPart = "A" | "B"

export interface Question {
  id: number
  part: QuestionPart
  text: string
  /** 
   * For ASRS v1.1 scoring: which answer columns are "darkly shaded" 
   * (clinically significant). The values represent the threshold index 
   * in the 5-point scale (0=Never,1=Rarely,2=Sometimes,3=Often,4=Very Often).
   * Answers >= threshold count as a "shaded" mark.
   */
  threshold: number
}

export const questions: Question[] = [
  // Part A - 6 screener questions
  {
    id: 1,
    part: "A",
    text: "当一项工作中具有挑战性的部分已经完成后，您多久会在收尾工作上遇到困难？",
    threshold: 2, // Sometimes and above
  },
  {
    id: 2,
    part: "A",
    text: "当您必须做一项需要条理性的任务时，您多久会在整理归纳上遇到困难？",
    threshold: 2,
  },
  {
    id: 3,
    part: "A",
    text: "您多久会在记住约会或承诺的事情上遇到困难？",
    threshold: 2,
  },
  {
    id: 4,
    part: "A",
    text: "当有一项需要大量思考的任务时，您多久会逃避或推迟开始？",
    threshold: 3, // Often and above
  },
  {
    id: 5,
    part: "A",
    text: "当您不得不长时间坐着时，您多久会坐立不安或手脚动个不停？",
    threshold: 3,
  },
  {
    id: 6,
    part: "A",
    text: "您多久会感到过度活跃，不得不做事情，好像被马达驱动一样？",
    threshold: 3,
  },
  // Part B - 12 additional questions
  {
    id: 7,
    part: "B",
    text: "当您做无聊或困难的项目时，您多久会犯粗心大意的错误？",
    threshold: 3,
  },
  {
    id: 8,
    part: "B",
    text: "当您在做无聊或重复性的工作时，您多久会在保持注意力上遇到困难？",
    threshold: 3,
  },
  {
    id: 9,
    part: "B",
    text: "即使别人在直接和您说话时，您多久会在集中注意力上遇到困难？",
    threshold: 2,
  },
  {
    id: 10,
    part: "B",
    text: "您多久会在家中或工作中放错东西或找不到东西？",
    threshold: 2,
  },
  {
    id: 11,
    part: "B",
    text: "您多久会被周围的活动或噪音分散注意力？",
    threshold: 2,
  },
  {
    id: 12,
    part: "B",
    text: "在会议或其他需要保持坐姿的场合，您多久会离开座位？",
    threshold: 2,
  },
  {
    id: 13,
    part: "B",
    text: "您多久会感到焦躁不安或坐立难安？",
    threshold: 3,
  },
  {
    id: 14,
    part: "B",
    text: "当您有空闲时间时，您多久会在放松和安静下来上遇到困难？",
    threshold: 3,
  },
  {
    id: 15,
    part: "B",
    text: "在社交场合中，您多久会发现自己说话过多？",
    threshold: 3,
  },
  {
    id: 16,
    part: "B",
    text: "在对话中，您多久会发现自己在别人说完之前就替对方把话说完了？",
    threshold: 2,
  },
  {
    id: 17,
    part: "B",
    text: "在需要轮流的场合，您多久会在等待轮到自己上遇到困难？",
    threshold: 3,
  },
  {
    id: 18,
    part: "B",
    text: "您多久会在别人忙碌的时候打断他们？",
    threshold: 2,
  },
]

export const answerOptions = [
  { value: 0, label: "从不" },
  { value: 1, label: "很少" },
  { value: 2, label: "有时" },
  { value: 3, label: "经常" },
  { value: 4, label: "非常频繁" },
]

export const partLabels: Record<QuestionPart, string> = {
  A: "Part A - 筛查项",
  B: "Part B - 补充项",
}

/**
 * Calculate ASRS v1.1 results.
 * - Part A: count how many answers fall in the "darkly shaded" zone (>= threshold).
 *   4 or more = highly consistent with ADHD.
 * - Part B: additional context; count shaded marks for supplementary info.
 * - Total score: sum of all 18 answers (0-72 range).
 */
export function calculateResults(answers: Record<number, number>) {
  let partAShadedCount = 0
  let partBShadedCount = 0
  let totalScore = 0
  const maxScore = questions.length * 4 // 18 * 4 = 72

  for (const q of questions) {
    const answer = answers[q.id] ?? 0
    totalScore += answer
    if (answer >= q.threshold) {
      if (q.part === "A") {
        partAShadedCount++
      } else {
        partBShadedCount++
      }
    }
  }

  const partAQuestions = questions.filter((q) => q.part === "A")
  const partBQuestions = questions.filter((q) => q.part === "B")

  const partAScore = partAQuestions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0)
  const partBScore = partBQuestions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0)

  const percentage = Math.round((totalScore / maxScore) * 100)

  return {
    totalScore,
    maxScore,
    percentage,
    partA: {
      score: partAScore,
      max: partAQuestions.length * 4,
      shadedCount: partAShadedCount,
      totalQuestions: partAQuestions.length,
      isHighlyConsistent: partAShadedCount >= 4,
    },
    partB: {
      score: partBScore,
      max: partBQuestions.length * 4,
      shadedCount: partBShadedCount,
      totalQuestions: partBQuestions.length,
    },
  }
}

export function getScreeningResult(partAShadedCount: number) {
  if (partAShadedCount >= 4) {
    return {
      level: "高度一致",
      description:
        "您在 Part A 筛查中有 4 项或以上的回答落入临床显著区域，这表明您的症状与成人ADHD高度一致，建议进一步寻求专业评估。",
    }
  } else if (partAShadedCount >= 2) {
    return {
      level: "部分一致",
      description:
        "您在 Part A 筛查中有部分回答落入临床显著区域。虽然未达到高度一致标准，但如果这些症状对您的生活造成困扰，仍建议咨询专业人士。",
    }
  } else {
    return {
      level: "不太一致",
      description:
        "您在 Part A 筛查中仅有少量回答落入临床显著区域，您的症状与成人ADHD的一致性较低。如果仍有疑虑，可以向专业人士咨询。",
    }
  }
}
