"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MatchCard } from "@/components/match-card"
import { Trophy, Sparkles, TrendingUp, History } from "lucide-react"
import { UPCOMING_MATCHES, getTeamById, type Match } from "@/lib/mock-data"

export default function HomePage() {
  const router = useRouter()
  const [selectedRound, setSelectedRound] = useState(20)

  // 获取所有轮次
  const rounds = Array.from(new Set(UPCOMING_MATCHES.map((m) => m.round))).sort((a, b) => a - b)

  // 获取当前轮次的比赛
  const currentMatches = UPCOMING_MATCHES.filter((m) => m.round === selectedRound)

  const handleMatchSelect = (match: Match) => {
    router.push(`/match/${match.id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* 头部 */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                <Trophy className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-balance">足球比赛推演AI</h1>
                <p className="text-sm text-muted-foreground">用AI预测比赛，成为最佳球迷</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => router.push("/history")}>
                <History className="h-4 w-4 mr-2" />
                历史记录
              </Button>
              <Button variant="outline" size="sm" onClick={() => router.push("/leaderboard")}>
                <TrendingUp className="h-4 w-4 mr-2" />
                排行榜
              </Button>
              <Button variant="outline" size="sm" onClick={() => router.push("/leaderboard")}>
                <Sparkles className="h-4 w-4 mr-2" />
                最佳预测
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="container mx-auto px-4 py-8">
        {/* 联赛选择 */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">中国足球协会超级联赛</h2>
              <p className="text-muted-foreground">2025赛季 · 剩余赛程推演</p>
            </div>
            <Badge variant="default" className="text-lg px-4 py-2">
              CSL 2025
            </Badge>
          </div>
        </Card>

        {/* 轮次选择 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">选择轮次</h3>
          <div className="flex flex-wrap gap-2">
            {rounds.map((round) => (
              <Button
                key={round}
                variant={selectedRound === round ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRound(round)}
                className="min-w-[80px]"
              >
                第{round}轮
              </Button>
            ))}
          </div>
        </div>

        {/* 比赛列表 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              第{selectedRound}轮赛程 ({currentMatches.length}场比赛)
            </h3>
            <p className="text-sm text-muted-foreground">点击任意比赛开始AI推演</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentMatches.map((match) => {
              const homeTeam = getTeamById(match.homeTeamId)
              const awayTeam = getTeamById(match.awayTeamId)

              if (!homeTeam || !awayTeam) return null

              return (
                <MatchCard
                  key={match.id}
                  match={match}
                  homeTeam={homeTeam}
                  awayTeam={awayTeam}
                  onSelect={handleMatchSelect}
                />
              )
            })}
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="border-t mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>足球比赛推演AI · 让每个球迷都能成为战术大师</p>
        </div>
      </footer>
    </div>
  )
}
