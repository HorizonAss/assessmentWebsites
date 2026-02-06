export type QuestionPart = "A" | "B"

export interface Question {
  id: number
  part: QuestionPart
  text: string
  /** Reverse-worded version of the question */
  reverseText: string
  /**
   * For ASRS v1.1 scoring: answers >= threshold count as a "shaded" mark.
   * 0=从不, 1=很少, 2=有时, 3=经常, 4=非常频繁
   */
  threshold: number
}

export const answerOptions = [
  { value: 0, label: "从不" },
  { value: 1, label: "很少" },
  { value: 2, label: "有时" },
  { value: 3, label: "经常" },
  { value: 4, label: "非常频繁" },
]

/** When a question is reversed, the labels are shown in opposite order */
export const reverseAnswerOptions = [
  { value: 4, label: "非常频繁" },
  { value: 3, label: "经常" },
  { value: 2, label: "有时" },
  { value: 1, label: "很少" },
  { value: 0, label: "从不" },
]

export const questions: Question[] = [
  // ===== Part A — 6 screening questions =====
  {
    id: 1,
    part: "A",
    text: "当一项工作中最困难的部分已经完成，需要收尾时，你是否难以妥善处理最后的细节？",
    reverseText: "当一项工作中最困难的部分已经完成后，你是否能够顺利地处理好收尾细节？",
    threshold: 2,
  },
  {
    id: 2,
    part: "A",
    text: "当你需要完成一项要求有条理的任务时，你是否难以将事情安排得井井有条？",
    reverseText: "当你需要完成一项要求有条理的任务时，你是否总能将事情安排得井井有条？",
    threshold: 2,
  },
  {
    id: 3,
    part: "A",
    text: "你是否常常忘记已经约好的事情或应尽的义务？",
    reverseText: "你是否总能准时记起约好的事情和应尽的义务？",
    threshold: 2,
  },
  {
    id: 4,
    part: "A",
    text: "当面对一项需要大量思考的任务时，你是否经常逃避或拖延、迟迟不肯开始？",
    reverseText: "当面对一项需要大量思考的任务时，你是否能够果断地着手开始？",
    threshold: 3,
  },
  {
    id: 5,
    part: "A",
    text: "当你需要长时间坐着时，你是否会坐立不安、手脚动个不停？",
    reverseText: "当你需要长时间坐着时，你是否能保持安静、不会坐立不安？",
    threshold: 3,
  },
  {
    id: 6,
    part: "A",
    text: "你是否常常感到停不下来，好像被马达驱动着一样不得不做事？",
    reverseText: "你是否在大多数时候都能保持从容平静，不会有停不下来的感觉？",
    threshold: 3,
  },

  // ===== Part B — 12 supplementary questions =====
  {
    id: 7,
    part: "B",
    text: "当你处理无聊或困难的项目时，你是否经常犯粗心大意的错误？",
    reverseText: "当你处理无聊或困难的项目时，你是否仍能保持细心、避免出错？",
    threshold: 3,
  },
  {
    id: 8,
    part: "B",
    text: "当你做枯燥或重复性的工作时，你是否难以保持注意力集中？",
    reverseText: "当你做枯燥或重复性的工作时，你是否仍然能够集中注意力？",
    threshold: 3,
  },
  {
    id: 9,
    part: "B",
    text: "当别人直接对你说话时，你是否难以集中精力倾听对方所说的内容？",
    reverseText: "当别人直接对你说话时，你是否能够专注地倾听对方所说的内容？",
    threshold: 2,
  },
  {
    id: 10,
    part: "B",
    text: "你是否经常在家中或工作中放错东西，或者找不到需要的物品？",
    reverseText: "你是否总能记得东西放在了哪里，需要时能很快找到？",
    threshold: 2,
  },
  {
    id: 11,
    part: "B",
    text: "你是否容易因为周围的活动或噪音而分散注意力？",
    reverseText: "即使周围有活动或噪音，你是否仍然能够保持专注？",
    threshold: 2,
  },
  {
    id: 12,
    part: "B",
    text: "在会议或其他需要保持就座的场合，你是否经常离开座位？",
    reverseText: "在会议或其他需要保持就座的场合，你是否能够安稳地坐在位子上？",
    threshold: 2,
  },
  {
    id: 13,
    part: "B",
    text: "你是否经常感到焦躁不安或浑身不自在？",
    reverseText: "你在大多数时候是否能够感到安定和放松？",
    threshold: 3,
  },
  {
    id: 14,
    part: "B",
    text: "在空闲时间里，你是否难以安静下来、好好放松？",
    reverseText: "在空闲时间里，你是否能够轻松地安静下来休息放松？",
    threshold: 3,
  },
  {
    id: 15,
    part: "B",
    text: "在社交场合中，你是否发现自己总是说个不停、话太多？",
    reverseText: "在社交场合中，你是否能够适度控制自己的发言，不会说太多？",
    threshold: 3,
  },
  {
    id: 16,
    part: "B",
    text: "在交谈中，你是否常常在别人把话说完之前就抢先替对方把话接完？",
    reverseText: "在交谈中，你是否能够耐心地等对方把话说完再作回应？",
    threshold: 2,
  },
  {
    id: 17,
    part: "B",
    text: "在需要排队或按顺序轮流的场合，你是否难以耐心等待？",
    reverseText: "在需要排队或按顺序轮流的场合，你是否能够耐心等待？",
    threshold: 3,
  },
  {
    id: 18,
    part: "B",
    text: "你是否经常在别人正忙的时候打断他们？",
    reverseText: "你是否能够做到在别人忙碌时不去打扰他们？",
    threshold: 2,
  },
]

export const partLabels: Record<QuestionPart, string> = {
  A: "Part A - 筛查项",
  B: "Part B - 补充项",
}

/**
 * Given a numeric seed, deterministically pick ~1/3 of questions to present
 * in reverse wording. Uses a simple LCG-based Fisher-Yates shuffle.
 */
export function pickReversedIds(seed: number): Set<number> {
  const ids = questions.map((q) => q.id)
  const shuffled = [...ids]
  let s = Math.abs(seed) | 1
  const lcg = () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff
    return s / 0x7fffffff
  }
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(lcg() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  const count = Math.round(questions.length / 3) // ~6 questions
  return new Set(shuffled.slice(0, count))
}

/**
 * Calculate ASRS v1.1 results.
 */
export function calculateResults(answers: Record<number, number>) {
  let partAShadedCount = 0
  let partBShadedCount = 0
  let totalScore = 0
  const maxScore = questions.length * 4

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
        "你在 Part A 筛查中有 4 项或以上的回答落入临床显著区域，这表明你的症状与成人ADHD高度一致，建议进一步寻求专业评估。",
    }
  } else if (partAShadedCount >= 2) {
    return {
      level: "部分一致",
      description:
        "你在 Part A 筛查中有部分回答落入临床显著区域。虽然未达到高度一致标准，但如果这些症状对你的生活造成了困扰，仍建议咨询专业人士。",
    }
  } else {
    return {
      level: "不太一致",
      description:
        "你在 Part A 筛查中仅有少量回答落入临床显著区域，症状与成人ADHD的一致性较低。如果仍有疑虑，可以向专业人士咨询。",
    }
  }
}
