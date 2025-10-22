"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface LiveCommentaryProps {
  events: any[]
  isLive?: boolean
}

export function LiveCommentary({ events, isLive = false }: LiveCommentaryProps) {
  const [visibleEvents, setVisibleEvents] = useState<any[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isLive) {
      // 模拟实时播报效果
      let index = 0
      const interval = setInterval(() => {
        if (index < events.length) {
          setVisibleEvents((prev) => [...prev, events[index]])
          index++
        } else {
          clearInterval(interval)
        }
      }, 1000)
      return () => clearInterval(interval)
    } else {
      setVisibleEvents(events)
    }
  }, [events, isLive])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleEvents])

  const getEventColor = (type: string) => {
    switch (type) {
      case "goal":
        return "bg-green-500/10 border-green-500"
      case "yellow_card":
        return "bg-yellow-500/10 border-yellow-500"
      case "red_card":
        return "bg-red-500/10 border-red-500"
      case "substitution":
        return "bg-blue-500/10 border-blue-500"
      default:
        return "bg-muted border-border"
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "goal":
        return "⚽"
      case "yellow_card":
        return "🟨"
      case "red_card":
        return "🟥"
      case "substitution":
        return "🔄"
      case "key_moment":
        return "⭐"
      default:
        return "📍"
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">实时解说</h3>
        {isLive && (
          <Badge variant="destructive" className="animate-pulse">
            LIVE
          </Badge>
        )}
      </div>

      <ScrollArea className="h-[500px]" ref={scrollRef}>
        <div className="space-y-3">
          {visibleEvents.map((event, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${getEventColor(event.type)} animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center gap-1 min-w-[60px]">
                  <Badge variant="outline" className="font-mono">
                    {event.minute}'
                  </Badge>
                  <span className="text-2xl">{getEventIcon(event.type)}</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold mb-1">{event.player}</div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
