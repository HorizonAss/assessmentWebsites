export interface Question {
  id: number
  category: "inattention" | "hyperactivity" | "impulsivity"
  text: string
}

export const questions: Question[] = [
  // 注意力不集中 (Inattention) - 9 questions
  {
    id: 1,
    category: "inattention",
    text: "我经常难以集中注意力完成任务或活动"
  },
  {
    id: 2,
    category: "inattention",
    text: "我经常在听别人讲话时走神"
  },
  {
    id: 3,
    category: "inattention",
    text: "我经常难以按照指示完成工作或任务"
  },
  {
    id: 4,
    category: "inattention",
    text: "我经常难以组织和规划任务或活动"
  },
  {
    id: 5,
    category: "inattention",
    text: "我经常逃避或不愿从事需要持续精神努力的任务"
  },
  {
    id: 6,
    category: "inattention",
    text: "我经常丢失日常活动所需的物品（如钥匙、手机等）"
  },
  {
    id: 7,
    category: "inattention",
    text: "我很容易被外界刺激分散注意力"
  },
  {
    id: 8,
    category: "inattention",
    text: "我在日常活动中经常健忘"
  },
  {
    id: 9,
    category: "inattention",
    text: "我经常在工作或学习中犯粗心大意的错误"
  },
  // 多动 (Hyperactivity) - 5 questions
  {
    id: 10,
    category: "hyperactivity",
    text: "我经常坐立不安，手脚动个不停"
  },
  {
    id: 11,
    category: "hyperactivity",
    text: "在需要保持坐着的场合，我经常会离开座位"
  },
  {
    id: 12,
    category: "hyperactivity",
    text: "我经常感到内心焦躁不安"
  },
  {
    id: 13,
    category: "hyperactivity",
    text: "我难以安静地参与休闲活动"
  },
  {
    id: 14,
    category: "hyperactivity",
    text: "我经常感觉像是\"被马达驱动\"一样停不下来"
  },
  // 冲动 (Impulsivity) - 4 questions
  {
    id: 15,
    category: "impulsivity",
    text: "我经常在问题问完之前就脱口回答"
  },
  {
    id: 16,
    category: "impulsivity",
    text: "我难以耐心等待轮到自己"
  },
  {
    id: 17,
    category: "impulsivity",
    text: "我经常打断或干扰他人（如插嘴或闯入他人活动）"
  },
  {
    id: 18,
    category: "impulsivity",
    text: "我经常在没有考虑后果的情况下做出决定"
  }
]

export const answerOptions = [
  { value: 0, label: "从不", description: "几乎从未发生" },
  { value: 1, label: "偶尔", description: "每月几次" },
  { value: 2, label: "经常", description: "每周几次" },
  { value: 3, label: "总是", description: "几乎每天" }
]

export const categoryLabels = {
  inattention: "注意力不集中",
  hyperactivity: "多动",
  impulsivity: "冲动"
}

export function calculateResults(answers: Record<number, number>) {
  const categories = {
    inattention: { total: 0, count: 0, max: 0 },
    hyperactivity: { total: 0, count: 0, max: 0 },
    impulsivity: { total: 0, count: 0, max: 0 }
  }

  questions.forEach((q) => {
    const answer = answers[q.id] ?? 0
    categories[q.category].total += answer
    categories[q.category].count += 1
    categories[q.category].max += 3
  })

  const totalScore = Object.values(categories).reduce((sum, cat) => sum + cat.total, 0)
  const maxScore = Object.values(categories).reduce((sum, cat) => sum + cat.max, 0)

  return {
    totalScore,
    maxScore,
    percentage: Math.round((totalScore / maxScore) * 100),
    categories: {
      inattention: {
        score: categories.inattention.total,
        max: categories.inattention.max,
        percentage: Math.round((categories.inattention.total / categories.inattention.max) * 100)
      },
      hyperactivity: {
        score: categories.hyperactivity.total,
        max: categories.hyperactivity.max,
        percentage: Math.round((categories.hyperactivity.total / categories.hyperactivity.max) * 100)
      },
      impulsivity: {
        score: categories.impulsivity.total,
        max: categories.impulsivity.max,
        percentage: Math.round((categories.impulsivity.total / categories.impulsivity.max) * 100)
      }
    }
  }
}

export function getResultLevel(percentage: number) {
  if (percentage < 25) {
    return {
      level: "低",
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/20",
      description: "您的得分较低，表明ADHD相关症状不明显。继续保持健康的生活方式。"
    }
  } else if (percentage < 50) {
    return {
      level: "轻度",
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/20",
      description: "您表现出一些轻度的ADHD相关症状。建议关注日常注意力管理，如果持续困扰，可以咨询专业人士。"
    }
  } else if (percentage < 75) {
    return {
      level: "中度",
      color: "text-amber-400",
      bgColor: "bg-amber-400/20",
      description: "您表现出中度的ADHD相关症状。建议寻求专业评估，以获得更准确的诊断和适当的支持。"
    }
  } else {
    return {
      level: "较高",
      color: "text-rose-400",
      bgColor: "bg-rose-400/20",
      description: "您的得分较高，表明可能存在明显的ADHD相关症状。强烈建议尽快咨询精神科医生或心理健康专家进行专业评估。"
    }
  }
}
