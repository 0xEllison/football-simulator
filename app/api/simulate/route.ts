import { streamText } from "ai"
import { deepseek } from "@ai-sdk/deepseek"

export const maxDuration = 60

export async function POST(req: Request) {
  const { homeTeam, awayTeam, homeLineup, awayLineup, homeFormation, awayFormation } = await req.json()

  // 计算球队平均能力
  const homeAvgRating = Math.round(homeLineup.reduce((sum: number, p: any) => sum + p.rating, 0) / homeLineup.length)
  const awayAvgRating = Math.round(awayLineup.reduce((sum: number, p: any) => sum + p.rating, 0) / awayLineup.length)

  // 构建详细的prompt
  const prompt = `你是一个专业的足球比赛解说员和分析师。现在需要你模拟一场中超联赛的比赛，并以生动有趣的方式解说比赛过程。

比赛信息：
主队：${homeTeam.name}（${homeTeam.city}）
客队：${awayTeam.name}（${awayTeam.city}）

主队阵容（${homeFormation}阵型）：
${homeLineup.map((p: any) => `${p.position} ${p.number}号 ${p.name} (能力值${p.rating})`).join("\n")}
主队平均能力：${homeAvgRating}

客队阵容（${awayFormation}阵型）：
${awayLineup.map((p: any) => `${p.position} ${p.number}号 ${p.name} (能力值${p.rating})`).join("\n")}
客队平均能力：${awayAvgRating}

请按照以下格式输出比赛推演结果（必须严格遵守JSON格式）：

{
  "matchAnalysis": "赛前分析，包括双方实力对比、阵型分析、关键球员、战术预测等（200-300字）",
  "events": [
    {
      "minute": 比赛分钟数（数字），
      "type": "事件类型（goal/yellow_card/red_card/substitution/key_moment）",
      "team": "球队（home/away）",
      "player": "球员姓名",
      "description": "事件描述（30-50字）"
    }
  ],
  "finalScore": {
    "home": 主队进球数（数字）,
    "away": 客队进球数（数字）
  },
  "matchSummary": "赛后总结，包括比赛过程回顾、关键时刻、球员表现、战术分析等（300-400字）",
  "predictions": [
    {
      "score": "比分预测（如2-1）",
      "probability": "概率（如35%）",
      "reason": "预测理由（50-80字）"
    }
  ]
}

要求：
1. 比赛事件要真实合理，包括进球、黄牌、红牌、换人、关键时刻等
2. 根据球员能力值和阵型合理分配进球和助攻
3. 比赛要有起伏和悬念，不要太平淡
4. 考虑主场优势、球员状态、阵型克制等因素
5. 事件时间要合理分布在90分钟内
6. 至少要有8-15个关键事件
7. 语言要生动有趣，像真实的足球解说
8. 必须输出有效的JSON格式，不要有任何其他文字
9. 提供3-5个不同的比分预测及其概率和理由

现在开始推演这场比赛！`

  const result = streamText({
    model: deepseek("deepseek-chat"),
    prompt,
    temperature: 0.8,
  })

  return result.toTextStreamResponse()
}
