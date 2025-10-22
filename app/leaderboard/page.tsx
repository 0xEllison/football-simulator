"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Trophy, Medal, Award, TrendingUp } from "lucide-react"
import Image from "next/image"

interface LeaderboardEntry {
  userId: string
  username: string
  matchId: string
  homeTeam: any
  awayTeam: any
  predictedScore: { home: number; away: number }
  actualScore: { home: number; away: number }
  accuracy: number
  timestamp: string
}

export default function LeaderboardPage() {
  const router = useRouter()
  const [topPredictions, setTopPredictions] = useState<LeaderboardEntry[]>([])
  const [recentMatches, setRecentMatches] = useState<any[]>([])

  useEffect(() => {
    // 模拟已完成的比赛和最佳预测
    const mockLeaderboard: LeaderboardEntry[] = [
      {
        userId: "user1",
        username: "足球大师",
        matchId: "m-20-1",
        homeTeam: { name: "上海海港", shortName: "海港", logo: "/shanghai-port-fc-logo.jpg" },
        awayTeam: { name: "山东泰山", shortName: "泰山", logo: "/shandong-taishan-fc-logo.jpg" },
        predictedScore: { home: 2, away: 1 },
        actualScore: { home: 2, away: 1 },
        accuracy: 100,
        timestamp: "2025-07-12T19:30:00",
      },
      {
        userId: "user2",
        username: "战术分析师",
        matchId: "m-20-1",
        homeTeam: { name: "上海海港", shortName: "海港", logo: "/shanghai-port-fc-logo.jpg" },
        awayTeam: { name: "山东泰山", shortName: "泰山", logo: "/shandong-taishan-fc-logo.jpg" },
        predictedScore: { home: 2, away: 2 },
        actualScore: { home: 2, away: 1 },
        accuracy: 85,
        timestamp: "2025-07-12T18:45:00",
      },
      {
        userId: "user3",
        username: "AI预言家",
        matchId: "m-20-1",
        homeTeam: { name: "上海海港", shortName: "海港", logo: "/shanghai-port-fc-logo.jpg" },
        awayTeam: { name: "山东泰山", shortName: "泰山", logo: "/shandong-taishan-fc-logo.jpg" },
        predictedScore: { home: 3, away: 1 },
        actualScore: { home: 2, away: 1 },
        accuracy: 80,
        timestamp: "2025-07-12T17:20:00",
      },
    ]

    setTopPredictions(mockLeaderboard)

    // 模拟最近完成的比赛
    const mockRecentMatches = [
      {
        id: "m-20-1",
        homeTeam: { name: "上海海港", shortName: "海港", logo: "/shanghai-port-fc-logo.jpg" },
        awayTeam: { name: "山东泰山", shortName: "泰山", logo: "/shandong-taishan-fc-logo.jpg" },
        score: { home: 2, away: 1 },
        date: "2025-07-12",
        topPredictors: 3,
      },
      {
        id: "m-20-2",
        homeTeam: { name: "上海申花", shortName: "申花", logo: "/shanghai-shenhua-fc-logo.jpg" },
        awayTeam: { name: "北京国安", shortName: "国安", logo: "/beijing-guoan-fc-logo.jpg" },
        score: { home: 1, away: 1 },
        date: "2025-07-12",
        topPredictors: 5,
      },
    ]

    setRecentMatches(mockRecentMatches)
  }, [])

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 1:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 2:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
    }
  }

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 95) return "text-green-500"
    if (accuracy >= 80) return "text-blue-500"
    if (accuracy >= 60) return "text-yellow-500"
    return "text-muted-foreground"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.push("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回首页
            </Button>
            <h1 className="text-xl font-bold">最佳预测排行榜</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Card className="p-6 mb-6 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">最佳球迷评选</h2>
              <p className="text-muted-foreground">
                真实比赛结束后，AI会自动评选出预测最准确的前三名用户，成为该场比赛的最佳球迷
              </p>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="top" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="top">最佳预测</TabsTrigger>
            <TabsTrigger value="matches">已完成比赛</TabsTrigger>
          </TabsList>

          <TabsContent value="top" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                预测准确度排行
              </h3>

              <div className="space-y-4">
                {topPredictions.map((entry, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all hover:shadow-lg ${
                      index === 0
                        ? "border-yellow-500 bg-yellow-500/5"
                        : index === 1
                          ? "border-gray-400 bg-gray-400/5"
                          : index === 2
                            ? "border-amber-600 bg-amber-600/5"
                            : "border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12">{getRankIcon(index)}</div>
                        <div>
                          <div className="font-bold text-lg">{entry.username}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(entry.timestamp).toLocaleString("zh-CN")}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${getAccuracyColor(entry.accuracy)}`}>
                          {entry.accuracy}%
                        </div>
                        <div className="text-sm text-muted-foreground">准确度</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Image
                          src={entry.homeTeam.logo || "/placeholder.svg"}
                          alt={entry.homeTeam.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <span className="font-semibold">{entry.homeTeam.shortName}</span>
                      </div>

                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">预测</div>
                        <div className="font-bold">
                          {entry.predictedScore.home} - {entry.predictedScore.away}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">实际</div>
                        <div className="font-bold text-primary">
                          {entry.actualScore.home} - {entry.actualScore.away}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{entry.awayTeam.shortName}</span>
                        <Image
                          src={entry.awayTeam.logo || "/placeholder.svg"}
                          alt={entry.awayTeam.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                    </div>

                    {index < 3 && (
                      <div className="mt-3 flex items-center justify-center">
                        <Badge variant={index === 0 ? "default" : "secondary"}>
                          {index === 0 ? "🏆 最佳球迷" : index === 1 ? "🥈 亚军" : "🥉 季军"}
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="matches" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentMatches.map((match) => (
                <Card key={match.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">已完成</Badge>
                    <span className="text-sm text-muted-foreground">{match.date}</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={match.homeTeam.logo || "/placeholder.svg"}
                        alt={match.homeTeam.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <span className="font-bold">{match.homeTeam.shortName}</span>
                    </div>

                    <div className="text-2xl font-bold">
                      <span className="text-primary">{match.score.home}</span>
                      <span className="mx-2">-</span>
                      <span className="text-secondary">{match.score.away}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold">{match.awayTeam.shortName}</span>
                      <Image
                        src={match.awayTeam.logo || "/placeholder.svg"}
                        alt={match.awayTeam.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm text-muted-foreground">{match.topPredictors} 位最佳预测者</span>
                    <Button variant="outline" size="sm">
                      查看排行
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card className="p-6 mt-6 bg-muted/50">
          <h3 className="text-lg font-bold mb-4">评选规则</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="font-bold text-primary">1.</span>
              <p>真实比赛结束后，AI会自动计算所有用户推演结果与真实比赛的相似度</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-primary">2.</span>
              <p>相似度计算包括：比分准确度、关键事件匹配度、比赛过程相似度等多个维度</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-primary">3.</span>
              <p>相似度最高的前三名用户将成为该场比赛的最佳球迷，获得荣誉徽章</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-primary">4.</span>
              <p>最佳球迷的推演战报将成为知识库数据，为未来的比赛推演提供参考</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
