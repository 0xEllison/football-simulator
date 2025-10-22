"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FootballField } from "@/components/football-field"
import { PlayerSelector } from "@/components/player-selector"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Play, RotateCcw, Info } from "lucide-react"
import {
  UPCOMING_MATCHES,
  getTeamById,
  FORMATION_LAYOUTS,
  type Player,
  type Formation,
  MOCK_PLAYERS,
} from "@/lib/mock-data"
import Image from "next/image"

export default function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()

  const match = UPCOMING_MATCHES.find((m) => m.id === id)
  const homeTeam = match ? getTeamById(match.homeTeamId) : null
  const awayTeam = match ? getTeamById(match.awayTeamId) : null

  const [homeFormation, setHomeFormation] = useState<Formation>("4-3-3")
  const [awayFormation, setAwayFormation] = useState<Formation>("4-4-2")

  // 获取球队所有球员
  const homeAllPlayers = homeTeam ? MOCK_PLAYERS.filter((p) => p.teamId === homeTeam.id) : []
  const awayAllPlayers = awayTeam ? MOCK_PLAYERS.filter((p) => p.teamId === awayTeam.id) : []

  // 首发阵容（前11人）
  const [homeLineup, setHomeLineup] = useState<Player[]>(homeAllPlayers.slice(0, 11))
  const [awayLineup, setAwayLineup] = useState<Player[]>(awayAllPlayers.slice(0, 11))

  const [selectedTeam, setSelectedTeam] = useState<"home" | "away">("home")
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<number | null>(null)
  const [showPlayerSelector, setShowPlayerSelector] = useState(false)

  if (!match || !homeTeam || !awayTeam) {
    return <div>比赛不存在</div>
  }

  const handlePlayerClick = (player: Player, index: number, team: "home" | "away") => {
    setSelectedTeam(team)
    setSelectedPlayerIndex(index)
    setShowPlayerSelector(true)
  }

  const handlePlayerSelect = (player: Player) => {
    if (selectedPlayerIndex === null) return

    if (selectedTeam === "home") {
      const newLineup = [...homeLineup]
      newLineup[selectedPlayerIndex] = player
      setHomeLineup(newLineup)
    } else {
      const newLineup = [...awayLineup]
      newLineup[selectedPlayerIndex] = player
      setAwayLineup(newLineup)
    }

    setShowPlayerSelector(false)
    setSelectedPlayerIndex(null)
  }

  const handleResetLineup = (team: "home" | "away") => {
    if (team === "home") {
      setHomeLineup(homeAllPlayers.slice(0, 11))
    } else {
      setAwayLineup(awayAllPlayers.slice(0, 11))
    }
  }

  const handleStartSimulation = () => {
    // 保存阵容到localStorage或传递到下一页
    const simulationData = {
      matchId: match.id,
      homeTeam,
      awayTeam,
      homeLineup,
      awayLineup,
      homeFormation,
      awayFormation,
    }
    localStorage.setItem("current-simulation", JSON.stringify(simulationData))
    router.push(`/simulation/${match.id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* 头部 */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.push("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回赛程
            </Button>
            <Badge variant="secondary">第{match.round}轮</Badge>
          </div>
        </div>
      </header>

      {/* 比赛信息 */}
      <div className="container mx-auto px-4 py-6">
        <Card className="p-6 mb-6 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={homeTeam.logo || "/placeholder.svg"}
                alt={homeTeam.name}
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h2 className="text-2xl font-bold">{homeTeam.name}</h2>
                <p className="text-muted-foreground">主场</p>
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">VS</div>
              <div className="text-sm text-muted-foreground">{match.date}</div>
              <div className="text-sm text-muted-foreground">{match.venue}</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <h2 className="text-2xl font-bold">{awayTeam.name}</h2>
                <p className="text-muted-foreground">客场</p>
              </div>
              <Image
                src={awayTeam.logo || "/placeholder.svg"}
                alt={awayTeam.name}
                width={60}
                height={60}
                className="rounded-full"
              />
            </div>
          </div>
        </Card>

        {/* 阵容编辑器 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 主队阵容 */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Image
                  src={homeTeam.logo || "/placeholder.svg"}
                  alt={homeTeam.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-bold text-lg">{homeTeam.shortName} 首发阵容</h3>
                  <p className="text-sm text-muted-foreground">点击球员进行替换</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Select value={homeFormation} onValueChange={(v) => setHomeFormation(v as Formation)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4-3-3">4-3-3</SelectItem>
                    <SelectItem value="4-4-2">4-4-2</SelectItem>
                    <SelectItem value="4-2-3-1">4-2-3-1</SelectItem>
                    <SelectItem value="3-5-2">3-5-2</SelectItem>
                    <SelectItem value="3-4-3">3-4-3</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={() => handleResetLineup("home")}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <FootballField
              players={homeLineup}
              positions={FORMATION_LAYOUTS[homeFormation]}
              onPlayerClick={(player, index) => handlePlayerClick(player, index, "home")}
              selectedIndex={selectedTeam === "home" ? (selectedPlayerIndex ?? undefined) : undefined}
              isHomeTeam={true}
            />
          </Card>

          {/* 客队阵容 */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Image
                  src={awayTeam.logo || "/placeholder.svg"}
                  alt={awayTeam.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-bold text-lg">{awayTeam.shortName} 首发阵容</h3>
                  <p className="text-sm text-muted-foreground">点击球员进行替换</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Select value={awayFormation} onValueChange={(v) => setAwayFormation(v as Formation)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4-3-3">4-3-3</SelectItem>
                    <SelectItem value="4-4-2">4-4-2</SelectItem>
                    <SelectItem value="4-2-3-1">4-2-3-1</SelectItem>
                    <SelectItem value="3-5-2">3-5-2</SelectItem>
                    <SelectItem value="3-4-3">3-4-3</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={() => handleResetLineup("away")}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <FootballField
              players={awayLineup}
              positions={FORMATION_LAYOUTS[awayFormation]}
              onPlayerClick={(player, index) => handlePlayerClick(player, index, "away")}
              selectedIndex={selectedTeam === "away" ? (selectedPlayerIndex ?? undefined) : undefined}
              isHomeTeam={false}
            />
          </Card>
        </div>

        {/* 球员选择器 */}
        {showPlayerSelector && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="max-w-md w-full">
              <PlayerSelector
                players={
                  selectedTeam === "home"
                    ? homeAllPlayers.filter((p) => !homeLineup.some((lp) => lp.id === p.id))
                    : awayAllPlayers.filter((p) => !awayLineup.some((lp) => lp.id === p.id))
                }
                selectedPlayer={
                  selectedPlayerIndex !== null
                    ? selectedTeam === "home"
                      ? homeLineup[selectedPlayerIndex]
                      : awayLineup[selectedPlayerIndex]
                    : undefined
                }
                onSelect={handlePlayerSelect}
                onClose={() => {
                  setShowPlayerSelector(false)
                  setSelectedPlayerIndex(null)
                }}
                positionFilter={
                  selectedPlayerIndex !== null
                    ? FORMATION_LAYOUTS[selectedTeam === "home" ? homeFormation : awayFormation][selectedPlayerIndex]
                        ?.position
                    : undefined
                }
              />
            </div>
          </div>
        )}

        {/* 比赛信息和开始按钮 */}
        <Card className="p-6">
          <Tabs defaultValue="info">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">比赛信息</TabsTrigger>
              <TabsTrigger value="news">最新动态</TabsTrigger>
              <TabsTrigger value="history">历史交锋</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <div className="flex items-start gap-2 p-4 bg-muted/50 rounded-lg">
                <Info className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-2">AI推演说明</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    AI将根据双方阵容、球员能力、历史战绩、最新状态等因素，模拟比赛过程并预测比分。你可以自定义首发阵容和阵型，看看不同的排兵布阵会带来怎样的结果！
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">主队平均能力</div>
                  <div className="text-2xl font-bold text-primary">
                    {Math.round(homeLineup.reduce((sum, p) => sum + p.rating, 0) / homeLineup.length)}
                  </div>
                </div>
                <div className="p-4 bg-secondary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">客队平均能力</div>
                  <div className="text-2xl font-bold text-secondary">
                    {Math.round(awayLineup.reduce((sum, p) => sum + p.rating, 0) / awayLineup.length)}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="news" className="space-y-3">
              <div className="p-4 border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">2天前</div>
                <p className="font-medium">{homeTeam.name}主帅：我们已经做好了充分准备</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">3天前</div>
                <p className="font-medium">{awayTeam.name}核心球员恢复训练，有望首发</p>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-3">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">2024赛季 第15轮</span>
                  <Badge variant="secondary">已结束</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{homeTeam.shortName}</span>
                  <span className="text-xl font-bold">2 - 1</span>
                  <span className="font-medium">{awayTeam.shortName}</span>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">2024赛季 第3轮</span>
                  <Badge variant="secondary">已结束</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{awayTeam.shortName}</span>
                  <span className="text-xl font-bold">1 - 1</span>
                  <span className="font-medium">{homeTeam.shortName}</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-center">
            <Button size="lg" className="text-lg px-8" onClick={handleStartSimulation}>
              <Play className="h-5 w-5 mr-2" />
              开始AI推演比赛
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
