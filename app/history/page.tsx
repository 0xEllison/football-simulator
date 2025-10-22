"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Trash2, Eye, Share2, Search, Calendar } from "lucide-react"
import Image from "next/image"

interface SavedSimulation {
  id: string
  matchId: string
  homeTeam: any
  awayTeam: any
  result: any
  timestamp: string
}

export default function HistoryPage() {
  const router = useRouter()
  const [simulations, setSimulations] = useState<SavedSimulation[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("saved-simulations")
    if (saved) {
      setSimulations(JSON.parse(saved))
    }
  }, [])

  const handleDelete = (id: string) => {
    const updated = simulations.filter((s) => s.id !== id)
    setSimulations(updated)
    localStorage.setItem("saved-simulations", JSON.stringify(updated))
  }

  const handleView = (simulation: SavedSimulation) => {
    localStorage.setItem("view-simulation", JSON.stringify(simulation))
    router.push(`/history/${simulation.id}`)
  }

  const filteredSimulations = simulations.filter(
    (s) =>
      s.homeTeam.name.toLowerCase().includes(search.toLowerCase()) ||
      s.awayTeam.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.push("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回首页
            </Button>
            <h1 className="text-xl font-bold">历史记录</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索球队..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Badge variant="secondary">共 {simulations.length} 条记录</Badge>
          </div>
        </Card>

        {filteredSimulations.length === 0 ? (
          <Card className="p-12">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">{search ? "未找到匹配的记录" : "还没有保存任何推演记录"}</p>
              <Button onClick={() => router.push("/")}>开始推演</Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSimulations.map((simulation) => (
              <Card key={simulation.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(simulation.timestamp).toLocaleString("zh-CN")}</span>
                  </div>
                  <Badge variant="outline">第{simulation.matchId.split("-")[1]}轮</Badge>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Image
                      src={simulation.homeTeam.logo || "/placeholder.svg"}
                      alt={simulation.homeTeam.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-bold">{simulation.homeTeam.shortName}</div>
                      <div className="text-sm text-muted-foreground">主场</div>
                    </div>
                  </div>

                  <div className="text-center px-4">
                    <div className="text-3xl font-bold">
                      <span className="text-primary">{simulation.result.finalScore.home}</span>
                      <span className="mx-2">-</span>
                      <span className="text-secondary">{simulation.result.finalScore.away}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-bold">{simulation.awayTeam.shortName}</div>
                      <div className="text-sm text-muted-foreground">客场</div>
                    </div>
                    <Image
                      src={simulation.awayTeam.logo || "/placeholder.svg"}
                      alt={simulation.awayTeam.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => handleView(simulation)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    查看详情
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Share2 className="h-4 w-4 mr-2" />
                    分享
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(simulation.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
