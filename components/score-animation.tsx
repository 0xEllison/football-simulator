"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface ScoreAnimationProps {
  homeTeam: { name: string; shortName: string; logo: string }
  awayTeam: { name: string; shortName: string; logo: string }
  homeScore: number
  awayScore: number
  animate?: boolean
}

export function ScoreAnimation({ homeTeam, awayTeam, homeScore, awayScore, animate = false }: ScoreAnimationProps) {
  const [displayHomeScore, setDisplayHomeScore] = useState(0)
  const [displayAwayScore, setDisplayAwayScore] = useState(0)

  useEffect(() => {
    if (animate) {
      // 动画效果：逐步增加分数
      let homeCount = 0
      let awayCount = 0

      const interval = setInterval(() => {
        if (homeCount < homeScore) {
          homeCount++
          setDisplayHomeScore(homeCount)
        }
        if (awayCount < awayScore) {
          awayCount++
          setDisplayAwayScore(awayCount)
        }
        if (homeCount >= homeScore && awayCount >= awayScore) {
          clearInterval(interval)
        }
      }, 300)

      return () => clearInterval(interval)
    } else {
      setDisplayHomeScore(homeScore)
      setDisplayAwayScore(awayScore)
    }
  }, [homeScore, awayScore, animate])

  return (
    <Card className="p-8 bg-gradient-to-r from-primary/20 via-background to-secondary/20">
      <div className="flex items-center justify-between">
        {/* 主队 */}
        <div className="flex flex-col items-center gap-3 flex-1">
          <Image
            src={homeTeam.logo || "/placeholder.svg"}
            alt={homeTeam.name}
            width={80}
            height={80}
            className="rounded-full"
          />
          <h3 className="text-xl font-bold text-center">{homeTeam.shortName}</h3>
        </div>

        {/* 比分 */}
        <div className="flex items-center gap-6 px-8">
          <div className="text-7xl font-bold text-primary animate-in zoom-in duration-500">{displayHomeScore}</div>
          <div className="text-4xl font-bold text-muted-foreground">-</div>
          <div className="text-7xl font-bold text-secondary animate-in zoom-in duration-500">{displayAwayScore}</div>
        </div>

        {/* 客队 */}
        <div className="flex flex-col items-center gap-3 flex-1">
          <Image
            src={awayTeam.logo || "/placeholder.svg"}
            alt={awayTeam.name}
            width={80}
            height={80}
            className="rounded-full"
          />
          <h3 className="text-xl font-bold text-center">{awayTeam.shortName}</h3>
        </div>
      </div>
    </Card>
  )
}
