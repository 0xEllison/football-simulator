"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { Player } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface PlayerSelectorProps {
  players: Player[]
  selectedPlayer?: Player
  onSelect: (player: Player) => void
  onClose: () => void
  positionFilter?: Player["position"]
}

export function PlayerSelector({ players, selectedPlayer, onSelect, onClose, positionFilter }: PlayerSelectorProps) {
  const [search, setSearch] = useState("")

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(search.toLowerCase())
    const matchesPosition = !positionFilter || player.position === positionFilter
    return matchesSearch && matchesPosition
  })

  const getPositionLabel = (position: Player["position"]) => {
    const labels = { GK: "门将", DF: "后卫", MF: "中场", FW: "前锋" }
    return labels[position]
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">选择球员</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          取消
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="搜索球员..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <ScrollArea className="h-[300px]">
        <div className="space-y-2">
          {filteredPlayers.map((player) => (
            <button
              key={player.id}
              onClick={() => {
                onSelect(player)
                onClose()
              }}
              className={cn(
                "w-full p-3 rounded-lg border-2 transition-all hover:border-primary text-left",
                selectedPlayer?.id === player.id ? "border-primary bg-primary/5" : "border-border",
                (player.injured || player.suspended) && "opacity-60",
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">
                    {player.number}
                  </div>
                  <div>
                    <div className="font-semibold">{player.name}</div>
                    <div className="text-sm text-muted-foreground">{getPositionLabel(player.position)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">能力 {player.rating}</Badge>
                  {player.injured && (
                    <Badge variant="destructive" className="gap-1">
                      <AlertCircle className="h-3 w-3" />
                      伤病
                    </Badge>
                  )}
                  {player.suspended && (
                    <Badge variant="destructive" className="gap-1">
                      <AlertCircle className="h-3 w-3" />
                      停赛
                    </Badge>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
