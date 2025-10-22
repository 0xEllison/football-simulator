"use client"

import { use, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Share2, Download } from "lucide-react"
import { ScoreAnimation } from "@/components/score-animation"
import { MatchStats } from "@/components/match-stats"
import { LiveCommentary } from "@/components/live-commentary"

export default function HistoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [simulation, setSimulation] = useState<any>(null)

  useEffect(() => {
    const saved = localStorage.getItem("saved-simulations")
    if (saved) {
      const simulations = JSON.parse(saved)
      const found = simulations.find((s: any) => s.id === id)
      if (found) {
        setSimulation(found)
      }
    }
  }, [id])

  if (!simulation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">未找到记录</p>
          <Button onClick={() => router.push("/history")}>返回历史记录</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.push("/history")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回历史记录
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                下载战报
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                分享
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <ScoreAnimation
            homeTeam={simulation.homeTeam}
            awayTeam={simulation.awayTeam}
            homeScore={simulation.result.finalScore.home}
            awayScore={simulation.result.finalScore.away}
            animate={false}
          />

          <Tabs defaultValue="commentary" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="commentary">实时解说</TabsTrigger>
              <TabsTrigger value="stats">比赛统计</TabsTrigger>
              <TabsTrigger value="analysis">深度分析</TabsTrigger>
              <TabsTrigger value="predictions">比分预测</TabsTrigger>
            </TabsList>

            <TabsContent value="commentary" className="mt-6">
              <LiveCommentary events={simulation.result.events || []} isLive={false} />
            </TabsContent>

            <TabsContent value="stats" className="mt-6">
              <MatchStats
                homeTeam={simulation.homeTeam.shortName}
                awayTeam={simulation.awayTeam.shortName}
                homeScore={simulation.result.finalScore.home}
                awayScore={simulation.result.finalScore.away}
                events={simulation.result.events || []}
              />
            </TabsContent>

            <TabsContent value="analysis" className="mt-6 space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  赛前分析
                </h3>
                <p className="text-muted-foreground leading-relaxed">{simulation.result.matchAnalysis}</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  赛后总结
                </h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {simulation.result.matchSummary}
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="predictions" className="mt-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  比分预测
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {simulation.result.predictions?.map((pred: any, index: number) => (
                    <div key={index} className="p-4 border-2 rounded-lg">
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
        </div>
      </div>
    </div>
  )
}
