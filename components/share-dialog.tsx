"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Share2, Copy, Download, Check } from "lucide-react"
import Image from "next/image"

interface ShareDialogProps {
  homeTeam: any
  awayTeam: any
  finalScore: { home: number; away: number }
  matchSummary: string
}

export function ShareDialog({ homeTeam, awayTeam, finalScore, matchSummary }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)

  const shareText = `⚽ AI足球推演战报

${homeTeam.name} ${finalScore.home} - ${finalScore.away} ${awayTeam.name}

${matchSummary.slice(0, 100)}...

来v0足球推演AI，用AI预测你心中的比赛！`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    // 创建一个简单的文本战报
    const blob = new Blob([shareText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `战报-${homeTeam.shortName}vs${awayTeam.shortName}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          分享战报
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>分享战报</DialogTitle>
        </DialogHeader>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Image
                src={homeTeam.logo || "/placeholder.svg"}
                alt={homeTeam.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-bold">{homeTeam.shortName}</span>
            </div>

            <div className="text-2xl font-bold">
              <span className="text-primary">{finalScore.home}</span>
              <span className="mx-2">-</span>
              <span className="text-secondary">{finalScore.away}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold">{awayTeam.shortName}</span>
              <Image
                src={awayTeam.logo || "/placeholder.svg"}
                alt={awayTeam.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3">{matchSummary}</p>

          <Badge variant="secondary" className="mt-4">
            AI足球推演
          </Badge>
        </Card>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 bg-transparent" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "已复制" : "复制文本"}
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            下载战报
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
