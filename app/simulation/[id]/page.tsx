"use client"

import { use, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, RotateCcw, Sparkles } from "lucide-react"
import { ScoreAnimation } from "@/components/score-animation"
import { MatchStats } from "@/components/match-stats"
import { LiveCommentary } from "@/components/live-commentary"
import { ShareDialog } from "@/components/share-dialog"

interface SimulationData {
  matchId: string
  homeTeam: any
  awayTeam: any
  homeLineup: any[]
  awayLineup: any[]
  homeFormation: string
  awayFormation: string
}

interface MatchEvent {
  minute: number
  type: "goal" | "yellow_card" | "red_card" | "substitution" | "key_moment"
  team: "home" | "away"
  player: string
  description: string
}

interface SimulationResult {
  matchAnalysis: string
  events: MatchEvent[]
  finalScore: { home: number; away: number }
  matchSummary: string
  predictions: Array<{
    score: string
    probability: string
    reason: string
  }>
}

export default function SimulationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [simulationData, setSimulationData] = useState<SimulationData | null>(null)
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [streamingText, setStreamingText] = useState("")
  const [statusMessage, setStatusMessage] = useState("")

  useEffect(() => {
    const data = localStorage.getItem("current-simulation")
    if (data) {
      setSimulationData(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    if (isSimulating && progress < 90) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, 90))
      }, 200)
      return () => clearInterval(interval)
    }
  }, [isSimulating, progress])

  const handleStartSimulation = async () => {
    if (!simulationData) return

    setIsSimulating(true)
    setProgress(0)
    setResult(null)
    setStreamingText("")
    setStatusMessage("正在连接 DeepSeek AI...")

    try {
      const startTime = Date.now()

      const response = await fetch("/api/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          homeTeam: simulationData.homeTeam,
          awayTeam: simulationData.awayTeam,
          homeLineup: simulationData.homeLineup,
          awayLineup: simulationData.awayLineup,
          homeFormation: simulationData.homeFormation,
          awayFormation: simulationData.awayFormation,
        }),
      })

      if (!response.ok) {
        throw new Error("Simulation failed")
      }

      setStatusMessage("AI 正在分析阵容和生成比赛...")
      setProgress(10)

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let accumulated = ""
      let lastUpdateTime = Date.now()

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          accumulated += chunk

          // 实时显示流式文本
          setStreamingText(accumulated)

          // 更新进度（基于接收到的数据量）
          const elapsed = Date.now() - startTime
          const newProgress = Math.min(10 + (elapsed / 1000) * 1.5, 95)
          setProgress(newProgress)

          // 每秒更新一次状态消息
          if (Date.now() - lastUpdateTime > 1000) {
            const charCount = accumulated.length
            setStatusMessage(`AI 正在生成... (已接收 ${charCount} 字符)`)
            lastUpdateTime = Date.now()
          }

          // 尝试解析累积的JSON
          try {
            // 清理 markdown 代码块标记
            let cleanedJson = accumulated.trim()
            if (cleanedJson.startsWith("```json")) {
              cleanedJson = cleanedJson.replace(/^```json\s*/, "").replace(/\s*```\s*$/, "")
            } else if (cleanedJson.startsWith("```")) {
              cleanedJson = cleanedJson.replace(/^```\s*/, "").replace(/\s*```\s*$/, "")
            }

            const parsed = JSON.parse(cleanedJson)
            setResult(parsed)
            setIsSimulating(false)
            setProgress(100)
            setStatusMessage("推演完成！")
            setStreamingText("")
            break
          } catch (e) {
            // JSON还未完整，继续等待
          }
        }

        // 如果流结束但没有解析成功，尝试最后一次解析
        if (!result && accumulated) {
          try {
            // 清理 markdown 代码块标记
            let cleanedJson = accumulated.trim()
            if (cleanedJson.startsWith("```json")) {
              cleanedJson = cleanedJson.replace(/^```json\s*/, "").replace(/\s*```\s*$/, "")
            } else if (cleanedJson.startsWith("```")) {
              cleanedJson = cleanedJson.replace(/^```\s*/, "").replace(/\s*```\s*$/, "")
            }

            const parsed = JSON.parse(cleanedJson)
            setResult(parsed)
            setStatusMessage("推演完成！")
          } catch (e) {
            console.error("Failed to parse final result:", e)
            console.error("Raw accumulated text:", accumulated)
            setStatusMessage("解析结果失败，但已接收到原始数据")
          }
          setIsSimulating(false)
          setProgress(100)
          setStreamingText("")
        }
      }
    } catch (error) {
      console.error("Simulation error:", error)
      setIsSimulating(false)
      setStatusMessage("推演失败")
      alert("推演失败，请重试")
    }
  }

  const handleSaveResult = () => {
    if (!result || !simulationData) return

    const savedSimulations = JSON.parse(localStorage.getItem("saved-simulations") || "[]")
    savedSimulations.push({
      id: Date.now().toString(),
      matchId: simulationData.matchId,
      homeTeam: simulationData.homeTeam,
      awayTeam: simulationData.awayTeam,
      result,
      timestamp: new Date().toISOString(),
    })
    localStorage.setItem("saved-simulations", JSON.stringify(savedSimulations))
    alert("推演结果已保存！")
  }

  if (!simulationData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">未找到比赛数据</p>
          <Button onClick={() => router.push("/")}>返回首页</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* 头部 */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.push(`/match/${id}`)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回阵容编辑
            </Button>
            {result && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleSaveResult}>
                  <Download className="h-4 w-4 mr-2" />
                  保存结果
                </Button>
                <ShareDialog
                  homeTeam={simulationData.homeTeam}
                  awayTeam={simulationData.awayTeam}
                  finalScore={result.finalScore}
                  matchSummary={result.matchSummary}
                />
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* 开始推演按钮 */}
        {!isSimulating && !result && (
          <div className="flex justify-center mb-6">
            <Button size="lg" className="text-lg px-8" onClick={handleStartSimulation}>
              <Sparkles className="h-5 w-5 mr-2" />
              开始AI推演
            </Button>
          </div>
        )}

        {/* 推演进度 */}
        {isSimulating && !result && (
          <Card className="p-6 mb-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold mb-2">🤖 DeepSeek AI 正在推演比赛...</h3>
              <p className="text-sm text-muted-foreground">{statusMessage}</p>
            </div>
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-center text-sm text-muted-foreground">{Math.round(progress)}%</p>

            {/* 实时显示 AI 生成的内容 */}
            {streamingText && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg max-h-[400px] overflow-y-auto">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-xs font-semibold text-muted-foreground">AI 实时输出</p>
                </div>
                <pre className="text-xs font-mono whitespace-pre-wrap break-words text-muted-foreground">
                  {streamingText}
                </pre>
              </div>
            )}

            <p className="text-center text-xs text-muted-foreground mt-4">
              ⏱️ DeepSeek 通常需要 30-60 秒完成推演，请耐心等待...
            </p>
          </Card>
        )}

        {/* 推演结果 */}
        {result && (
          <div className="space-y-6">
            <ScoreAnimation
              homeTeam={simulationData.homeTeam}
              awayTeam={simulationData.awayTeam}
              homeScore={result.finalScore.home}
              awayScore={result.finalScore.away}
              animate={true}
            />

            <Tabs defaultValue="commentary" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="commentary">实时解说</TabsTrigger>
                <TabsTrigger value="stats">比赛统计</TabsTrigger>
                <TabsTrigger value="analysis">深度分析</TabsTrigger>
                <TabsTrigger value="predictions">比分预测</TabsTrigger>
              </TabsList>

              <TabsContent value="commentary" className="mt-6">
                <LiveCommentary events={result.events || []} isLive={false} />
              </TabsContent>

              <TabsContent value="stats" className="mt-6">
                <MatchStats
                  homeTeam={simulationData.homeTeam.shortName}
                  awayTeam={simulationData.awayTeam.shortName}
                  homeScore={result.finalScore.home}
                  awayScore={result.finalScore.away}
                  events={result.events || []}
                />
              </TabsContent>

              <TabsContent value="analysis" className="mt-6 space-y-6">
                {/* 赛前分析 */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-2xl">📊</span>
                    赛前分析
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{result.matchAnalysis}</p>
                </Card>

                {/* 赛后总结 */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-2xl">📝</span>
                    赛后总结
                  </h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{result.matchSummary}</p>
                </Card>
              </TabsContent>

              <TabsContent value="predictions" className="mt-6">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    比分预测
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {result.predictions?.map((pred, index) => (
                      <div
                        key={index}
                        className="p-4 border-2 rounded-lg hover:border-primary transition-colors cursor-pointer"
                      >
                        <div className="text-center mb-2">
                          <div className="text-3xl font-bold text-primary mb-1">{pred.score}</div>
                          <span className="text-sm text-muted-foreground">{pred.probability}</span>
                        </div>
                        <p className="text-sm text-muted-foreground text-center">{pred.reason}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* 重新推演 */}
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="outline" onClick={handleStartSimulation}>
                <RotateCcw className="h-5 w-5 mr-2" />
                重新推演
              </Button>
              <Button size="lg" onClick={handleSaveResult}>
                <Download className="h-5 w-5 mr-2" />
                保存到历史记录
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
