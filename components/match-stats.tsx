"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface MatchStatsProps {
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  events: any[]
}

export function MatchStats({ homeTeam, awayTeam, homeScore, awayScore, events }: MatchStatsProps) {
  // 计算统计数据
  const homeEvents = events.filter((e) => e.team === "home")
  const awayEvents = events.filter((e) => e.team === "away")

  const homeGoals = homeEvents.filter((e) => e.type === "goal").length
  const awayGoals = awayEvents.filter((e) => e.type === "goal").length

  const homeYellowCards = homeEvents.filter((e) => e.type === "yellow_card").length
  const awayYellowCards = awayEvents.filter((e) => e.type === "yellow_card").length

  const homeRedCards = homeEvents.filter((e) => e.type === "red_card").length
  const awayRedCards = awayEvents.filter((e) => e.type === "red_card").length

  const homeKeyMoments = homeEvents.filter((e) => e.type === "key_moment").length
  const awayKeyMoments = awayEvents.filter((e) => e.type === "key_moment").length

  const stats = [
    {
      label: "进球",
      home: homeGoals,
      away: awayGoals,
    },
    {
      label: "关键时刻",
      home: homeKeyMoments,
      away: awayKeyMoments,
    },
    {
      label: "黄牌",
      home: homeYellowCards,
      away: awayYellowCards,
    },
    {
      label: "红牌",
      home: homeRedCards,
      away: awayRedCards,
    },
  ]

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-6 text-center">比赛统计</h3>
      <div className="space-y-6">
        {stats.map((stat, index) => {
          const total = stat.home + stat.away || 1
          const homePercent = (stat.home / total) * 100
          const awayPercent = (stat.away / total) * 100

          return (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-primary">{stat.home}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <span className="font-semibold text-secondary">{stat.away}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden flex">
                  <div className="bg-primary h-full transition-all duration-500" style={{ width: `${homePercent}%` }} />
                  <div
                    className="bg-secondary h-full transition-all duration-500"
                    style={{ width: `${awayPercent}%` }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-6 border-t">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{homeTeam}</span>
          <span className="font-bold">控球率</span>
          <span className="text-muted-foreground">{awayTeam}</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold text-primary">
            {Math.round((homeEvents.length / (homeEvents.length + awayEvents.length || 1)) * 100)}%
          </span>
          <Progress
            value={(homeEvents.length / (homeEvents.length + awayEvents.length || 1)) * 100}
            className="flex-1"
          />
          <span className="font-semibold text-secondary">
            {Math.round((awayEvents.length / (homeEvents.length + awayEvents.length || 1)) * 100)}%
          </span>
        </div>
      </div>
    </Card>
  )
}
