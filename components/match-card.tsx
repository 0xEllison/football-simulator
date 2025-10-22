"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin } from "lucide-react"
import type { Match, Team } from "@/lib/mock-data"
import Image from "next/image"

interface MatchCardProps {
  match: Match
  homeTeam: Team
  awayTeam: Team
  onSelect: (match: Match) => void
}

export function MatchCard({ match, homeTeam, awayTeam, onSelect }: MatchCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => onSelect(match)}>
      <div className="flex items-center justify-between mb-4">
        <Badge variant="secondary" className="font-mono">
          第{match.round}轮
        </Badge>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{match.date}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col items-center gap-2 flex-1">
          <Image
            src={homeTeam.logo || "/placeholder.svg"}
            alt={homeTeam.name}
            width={64}
            height={64}
            className="rounded-full"
          />
          <h3 className="font-bold text-lg text-center">{homeTeam.shortName}</h3>
          <p className="text-xs text-muted-foreground">{homeTeam.city}</p>
        </div>

        <div className="flex flex-col items-center gap-2 px-6">
          <div className="text-3xl font-bold text-primary">VS</div>
          <Button size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            开始推演
          </Button>
        </div>

        <div className="flex flex-col items-center gap-2 flex-1">
          <Image
            src={awayTeam.logo || "/placeholder.svg"}
            alt={awayTeam.name}
            width={64}
            height={64}
            className="rounded-full"
          />
          <h3 className="font-bold text-lg text-center">{awayTeam.shortName}</h3>
          <p className="text-xs text-muted-foreground">{awayTeam.city}</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4 border-t">
        <MapPin className="h-4 w-4" />
        <span>{match.venue}</span>
      </div>
    </Card>
  )
}
