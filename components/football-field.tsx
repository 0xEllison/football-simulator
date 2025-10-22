"use client"

import { cn } from "@/lib/utils"
import type { Player } from "@/lib/mock-data"

interface FootballFieldProps {
  players: Player[]
  positions: { x: number; y: number }[]
  onPlayerClick?: (player: Player, index: number) => void
  selectedIndex?: number
  isHomeTeam?: boolean
}

export function FootballField({
  players,
  positions,
  onPlayerClick,
  selectedIndex,
  isHomeTeam = true,
}: FootballFieldProps) {
  return (
    <div className="relative w-full aspect-[2/3] bg-gradient-to-b from-primary/20 to-primary/30 rounded-lg overflow-hidden field-pattern border-2 border-primary/40">
      {/* 球场标线 */}
      <div className="absolute inset-0">
        {/* 中线 */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/30" />
        {/* 中圈 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-white/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/50" />

        {/* 禁区 - 上方 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[15%] border-2 border-t-0 border-white/30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[8%] border-2 border-t-0 border-white/30" />

        {/* 禁区 - 下方 */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[15%] border-2 border-b-0 border-white/30" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[8%] border-2 border-b-0 border-white/30" />
      </div>

      {/* 球员位置 */}
      {players.map((player, index) => {
        const pos = positions[index]
        if (!pos) return null

        return (
          <button
            key={player.id}
            onClick={() => onPlayerClick?.(player, index)}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 transition-all hover:scale-110",
              selectedIndex === index && "scale-125 z-10",
            )}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
            }}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg border-2 transition-colors",
                isHomeTeam
                  ? "bg-primary text-primary-foreground border-primary-foreground/20"
                  : "bg-secondary text-secondary-foreground border-secondary-foreground/20",
                selectedIndex === index && "ring-4 ring-white/50",
                player.injured && "opacity-50",
                player.suspended && "opacity-50",
              )}
            >
              {player.number}
            </div>
            <div className="bg-black/70 text-white text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
              {player.name}
            </div>
            {(player.injured || player.suspended) && (
              <div className="bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded-full">
                {player.injured ? "伤" : "停"}
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
