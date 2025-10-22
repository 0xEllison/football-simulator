export interface Team {
  id: string
  name: string
  shortName: string
  logo: string
  city: string
}

export interface Player {
  id: string
  name: string
  number: number
  position: "GK" | "DF" | "MF" | "FW"
  teamId: string
  rating: number
  injured?: boolean
  suspended?: boolean
}

export interface Match {
  id: string
  round: number
  homeTeamId: string
  awayTeamId: string
  date: string
  venue: string
  status: "upcoming" | "completed"
  homeScore?: number
  awayScore?: number
}

export const CSL_TEAMS: Team[] = [
  { id: "sh-port", name: "上海海港", shortName: "海港", logo: "/shanghai-port-fc-logo.jpg", city: "上海" },
  { id: "sh-shenhua", name: "上海申花", shortName: "申花", logo: "/shanghai-shenhua-fc-logo.jpg", city: "上海" },
  { id: "sd-taishan", name: "山东泰山", shortName: "泰山", logo: "/shandong-taishan-fc-logo.jpg", city: "济南" },
  { id: "bj-guoan", name: "北京国安", shortName: "国安", logo: "/beijing-guoan-fc-logo.jpg", city: "北京" },
  { id: "gz-evergrande", name: "广州队", shortName: "广州", logo: "/guangzhou-fc-logo.jpg", city: "广州" },
  { id: "tj-jinmen", name: "天津津门虎", shortName: "津门虎", logo: "/tianjin-jinmen-tiger-fc-logo.jpg", city: "天津" },
  { id: "cd-rongcheng", name: "成都蓉城", shortName: "蓉城", logo: "/chengdu-rongcheng-fc-logo.jpg", city: "成都" },
  { id: "wh-three-towns", name: "武汉三镇", shortName: "三镇", logo: "/wuhan-three-towns-fc-logo.jpg", city: "武汉" },
  { id: "hz-greentown", name: "浙江队", shortName: "浙江", logo: "/zhejiang-fc-logo.jpg", city: "杭州" },
  {
    id: "cq-lifan",
    name: "重庆两江竞技",
    shortName: "重庆",
    logo: "/chongqing-liangjiang-athletic-fc-logo.jpg",
    city: "重庆",
  },
  { id: "dl-pro", name: "大连人", shortName: "大连", logo: "/dalian-pro-fc-logo.jpg", city: "大连" },
  { id: "changchun", name: "长春亚泰", shortName: "亚泰", logo: "/changchun-yatai-fc-logo.jpg", city: "长春" },
  { id: "henan", name: "河南队", shortName: "河南", logo: "/henan-fc-logo.jpg", city: "郑州" },
  { id: "shenzhen", name: "深圳队", shortName: "深圳", logo: "/shenzhen-fc-logo.jpg", city: "深圳" },
  { id: "meizhou", name: "梅州客家", shortName: "梅州", logo: "/meizhou-hakka-fc-logo.jpg", city: "梅州" },
  { id: "nantong", name: "南通支云", shortName: "南通", logo: "/placeholder.svg?height=80&width=80", city: "南通" },
]

// 生成剩余赛程（第20-30轮）
export const UPCOMING_MATCHES: Match[] = [
  // 第20轮
  {
    id: "m-20-1",
    round: 20,
    homeTeamId: "sh-port",
    awayTeamId: "sd-taishan",
    date: "2025-07-12",
    venue: "上海体育场",
    status: "upcoming",
  },
  {
    id: "m-20-2",
    round: 20,
    homeTeamId: "sh-shenhua",
    awayTeamId: "bj-guoan",
    date: "2025-07-12",
    venue: "虹口足球场",
    status: "upcoming",
  },
  {
    id: "m-20-3",
    round: 20,
    homeTeamId: "wh-three-towns",
    awayTeamId: "cd-rongcheng",
    date: "2025-07-13",
    venue: "武汉体育中心",
    status: "upcoming",
  },
  {
    id: "m-20-4",
    round: 20,
    homeTeamId: "gz-evergrande",
    awayTeamId: "tj-jinmen",
    date: "2025-07-13",
    venue: "天河体育场",
    status: "upcoming",
  },
  {
    id: "m-20-5",
    round: 20,
    homeTeamId: "hz-greentown",
    awayTeamId: "dl-pro",
    date: "2025-07-14",
    venue: "黄龙体育中心",
    status: "upcoming",
  },
  {
    id: "m-20-6",
    round: 20,
    homeTeamId: "changchun",
    awayTeamId: "henan",
    date: "2025-07-14",
    venue: "长春体育场",
    status: "upcoming",
  },
  {
    id: "m-20-7",
    round: 20,
    homeTeamId: "shenzhen",
    awayTeamId: "meizhou",
    date: "2025-07-14",
    venue: "深圳大运中心",
    status: "upcoming",
  },
  {
    id: "m-20-8",
    round: 20,
    homeTeamId: "cq-lifan",
    awayTeamId: "nantong",
    date: "2025-07-14",
    venue: "重庆奥体中心",
    status: "upcoming",
  },

  // 第21轮
  {
    id: "m-21-1",
    round: 21,
    homeTeamId: "sd-taishan",
    awayTeamId: "sh-shenhua",
    date: "2025-07-19",
    venue: "济南奥体中心",
    status: "upcoming",
  },
  {
    id: "m-21-2",
    round: 21,
    homeTeamId: "bj-guoan",
    awayTeamId: "wh-three-towns",
    date: "2025-07-19",
    venue: "工人体育场",
    status: "upcoming",
  },
  {
    id: "m-21-3",
    round: 21,
    homeTeamId: "cd-rongcheng",
    awayTeamId: "sh-port",
    date: "2025-07-20",
    venue: "成都凤凰山",
    status: "upcoming",
  },
  {
    id: "m-21-4",
    round: 21,
    homeTeamId: "tj-jinmen",
    awayTeamId: "hz-greentown",
    date: "2025-07-20",
    venue: "天津奥体中心",
    status: "upcoming",
  },
  {
    id: "m-21-5",
    round: 21,
    homeTeamId: "dl-pro",
    awayTeamId: "gz-evergrande",
    date: "2025-07-21",
    venue: "大连体育中心",
    status: "upcoming",
  },
  {
    id: "m-21-6",
    round: 21,
    homeTeamId: "henan",
    awayTeamId: "shenzhen",
    date: "2025-07-21",
    venue: "郑州航海体育场",
    status: "upcoming",
  },
  {
    id: "m-21-7",
    round: 21,
    homeTeamId: "meizhou",
    awayTeamId: "changchun",
    date: "2025-07-21",
    venue: "梅州五华体育场",
    status: "upcoming",
  },
  {
    id: "m-21-8",
    round: 21,
    homeTeamId: "nantong",
    awayTeamId: "cq-lifan",
    date: "2025-07-21",
    venue: "南通体育场",
    status: "upcoming",
  },

  // 第22轮
  {
    id: "m-22-1",
    round: 22,
    homeTeamId: "sh-port",
    awayTeamId: "bj-guoan",
    date: "2025-07-26",
    venue: "上海体育场",
    status: "upcoming",
  },
  {
    id: "m-22-2",
    round: 22,
    homeTeamId: "sh-shenhua",
    awayTeamId: "cd-rongcheng",
    date: "2025-07-26",
    venue: "虹口足球场",
    status: "upcoming",
  },
  {
    id: "m-22-3",
    round: 22,
    homeTeamId: "wh-three-towns",
    awayTeamId: "sd-taishan",
    date: "2025-07-27",
    venue: "武汉体育中心",
    status: "upcoming",
  },
  {
    id: "m-22-4",
    round: 22,
    homeTeamId: "gz-evergrande",
    awayTeamId: "henan",
    date: "2025-07-27",
    venue: "天河体育场",
    status: "upcoming",
  },
  {
    id: "m-22-5",
    round: 22,
    homeTeamId: "hz-greentown",
    awayTeamId: "meizhou",
    date: "2025-07-28",
    venue: "黄龙体育中心",
    status: "upcoming",
  },
  {
    id: "m-22-6",
    round: 22,
    homeTeamId: "tj-jinmen",
    awayTeamId: "nantong",
    date: "2025-07-28",
    venue: "天津奥体中心",
    status: "upcoming",
  },
]

// 模拟球员数据（每队简化为15人）
export const MOCK_PLAYERS: Player[] = [
  // 上海海港 (4-3-3阵型)
  { id: "p-sh-port-1", name: "颜骏凌", number: 1, position: "GK", teamId: "sh-port", rating: 85 },
  { id: "p-sh-port-2", name: "王燊超", number: 4, position: "DF", teamId: "sh-port", rating: 82 },
  { id: "p-sh-port-3", name: "魏震", number: 5, position: "DF", teamId: "sh-port", rating: 80 },
  { id: "p-sh-port-4", name: "李昂", number: 3, position: "DF", teamId: "sh-port", rating: 81 },
  { id: "p-sh-port-5", name: "傅欢", number: 2, position: "DF", teamId: "sh-port", rating: 78 },
  { id: "p-sh-port-6", name: "杨世元", number: 6, position: "MF", teamId: "sh-port", rating: 79 },
  { id: "p-sh-port-7", name: "奥斯卡", number: 8, position: "MF", teamId: "sh-port", rating: 88 },
  { id: "p-sh-port-8", name: "徐新", number: 15, position: "MF", teamId: "sh-port", rating: 80 },
  { id: "p-sh-port-9", name: "武磊", number: 7, position: "FW", teamId: "sh-port", rating: 84 },
  { id: "p-sh-port-10", name: "保利尼奥", number: 10, position: "FW", teamId: "sh-port", rating: 86 },
  { id: "p-sh-port-11", name: "古斯塔沃", number: 9, position: "FW", teamId: "sh-port", rating: 83 },
  { id: "p-sh-port-12", name: "陈威", number: 12, position: "GK", teamId: "sh-port", rating: 76 },
  { id: "p-sh-port-13", name: "张琳芃", number: 21, position: "DF", teamId: "sh-port", rating: 79 },
  { id: "p-sh-port-14", name: "陈彬彬", number: 11, position: "MF", teamId: "sh-port", rating: 77 },
  { id: "p-sh-port-15", name: "李圣龙", number: 14, position: "FW", teamId: "sh-port", rating: 75 },

  // 山东泰山 (4-4-2阵型)
  { id: "p-sd-taishan-1", name: "王大雷", number: 1, position: "GK", teamId: "sd-taishan", rating: 84 },
  { id: "p-sd-taishan-2", name: "郑铮", number: 5, position: "DF", teamId: "sd-taishan", rating: 80 },
  { id: "p-sd-taishan-3", name: "贾德松", number: 3, position: "DF", teamId: "sd-taishan", rating: 83 },
  { id: "p-sd-taishan-4", name: "王彤", number: 4, position: "DF", teamId: "sd-taishan", rating: 79 },
  { id: "p-sd-taishan-5", name: "刘洋", number: 2, position: "DF", teamId: "sd-taishan", rating: 78 },
  { id: "p-sd-taishan-6", name: "孙准浩", number: 6, position: "MF", teamId: "sd-taishan", rating: 85 },
  { id: "p-sd-taishan-7", name: "费莱尼", number: 10, position: "MF", teamId: "sd-taishan", rating: 87 },
  { id: "p-sd-taishan-8", name: "廖力生", number: 8, position: "MF", teamId: "sd-taishan", rating: 80 },
  { id: "p-sd-taishan-9", name: "陈蒲", number: 7, position: "MF", teamId: "sd-taishan", rating: 78 },
  { id: "p-sd-taishan-10", name: "克雷桑", number: 9, position: "FW", teamId: "sd-taishan", rating: 86 },
  { id: "p-sd-taishan-11", name: "莫伊塞斯", number: 11, position: "FW", teamId: "sd-taishan", rating: 84 },
  { id: "p-sd-taishan-12", name: "韩镕泽", number: 18, position: "GK", teamId: "sd-taishan", rating: 75 },
  { id: "p-sd-taishan-13", name: "石柯", number: 15, position: "DF", teamId: "sd-taishan", rating: 77 },
  { id: "p-sd-taishan-14", name: "金敬道", number: 17, position: "MF", teamId: "sd-taishan", rating: 79 },
  { id: "p-sd-taishan-15", name: "陈哲超", number: 20, position: "FW", teamId: "sd-taishan", rating: 74 },

  // 上海申花
  { id: "p-sh-shenhua-1", name: "马镇", number: 1, position: "GK", teamId: "sh-shenhua", rating: 79 },
  { id: "p-sh-shenhua-2", name: "朱辰杰", number: 6, position: "DF", teamId: "sh-shenhua", rating: 81 },
  { id: "p-sh-shenhua-3", name: "蒋圣龙", number: 4, position: "DF", teamId: "sh-shenhua", rating: 78 },
  { id: "p-sh-shenhua-4", name: "温家宝", number: 3, position: "DF", teamId: "sh-shenhua", rating: 77 },
  { id: "p-sh-shenhua-5", name: "吴曦", number: 8, position: "MF", teamId: "sh-shenhua", rating: 82 },
  { id: "p-sh-shenhua-6", name: "马丁斯", number: 10, position: "MF", teamId: "sh-shenhua", rating: 85 },
  { id: "p-sh-shenhua-7", name: "于汉超", number: 7, position: "FW", teamId: "sh-shenhua", rating: 80 },
  { id: "p-sh-shenhua-8", name: "马莱莱", number: 9, position: "FW", teamId: "sh-shenhua", rating: 83 },

  // 北京国安
  { id: "p-bj-guoan-1", name: "侯森", number: 1, position: "GK", teamId: "bj-guoan", rating: 81 },
  { id: "p-bj-guoan-2", name: "于大宝", number: 6, position: "DF", teamId: "bj-guoan", rating: 80 },
  { id: "p-bj-guoan-3", name: "李磊", number: 3, position: "DF", teamId: "bj-guoan", rating: 79 },
  { id: "p-bj-guoan-4", name: "池忠国", number: 8, position: "MF", teamId: "bj-guoan", rating: 78 },
  { id: "p-bj-guoan-5", name: "比埃拉", number: 10, position: "MF", teamId: "bj-guoan", rating: 86 },
  { id: "p-bj-guoan-6", name: "张玉宁", number: 9, position: "FW", teamId: "bj-guoan", rating: 82 },

  // 成都蓉城
  { id: "p-cd-rongcheng-1", name: "韩佳奇", number: 1, position: "GK", teamId: "cd-rongcheng", rating: 77 },
  { id: "p-cd-rongcheng-2", name: "艾克森", number: 10, position: "FW", teamId: "cd-rongcheng", rating: 84 },
  { id: "p-cd-rongcheng-3", name: "罗慕洛", number: 9, position: "FW", teamId: "cd-rongcheng", rating: 82 },

  // 武汉三镇
  { id: "p-wh-three-towns-1", name: "刘殿座", number: 1, position: "GK", teamId: "wh-three-towns", rating: 80 },
  { id: "p-wh-three-towns-2", name: "韦世豪", number: 7, position: "FW", teamId: "wh-three-towns", rating: 81 },
  { id: "p-wh-three-towns-3", name: "马尔康", number: 9, position: "FW", teamId: "wh-three-towns", rating: 85 },
]

export type Formation = "4-3-3" | "4-4-2" | "3-5-2" | "4-2-3-1" | "3-4-3"

export interface LineupPosition {
  position: Player["position"]
  x: number // 0-100 百分比
  y: number // 0-100 百分比
}

export const FORMATION_LAYOUTS: Record<Formation, LineupPosition[]> = {
  "4-3-3": [
    { position: "GK", x: 50, y: 95 },
    { position: "DF", x: 20, y: 75 },
    { position: "DF", x: 40, y: 80 },
    { position: "DF", x: 60, y: 80 },
    { position: "DF", x: 80, y: 75 },
    { position: "MF", x: 30, y: 55 },
    { position: "MF", x: 50, y: 50 },
    { position: "MF", x: 70, y: 55 },
    { position: "FW", x: 25, y: 25 },
    { position: "FW", x: 50, y: 20 },
    { position: "FW", x: 75, y: 25 },
  ],
  "4-4-2": [
    { position: "GK", x: 50, y: 95 },
    { position: "DF", x: 20, y: 75 },
    { position: "DF", x: 40, y: 80 },
    { position: "DF", x: 60, y: 80 },
    { position: "DF", x: 80, y: 75 },
    { position: "MF", x: 20, y: 50 },
    { position: "MF", x: 40, y: 55 },
    { position: "MF", x: 60, y: 55 },
    { position: "MF", x: 80, y: 50 },
    { position: "FW", x: 35, y: 25 },
    { position: "FW", x: 65, y: 25 },
  ],
  "4-2-3-1": [
    { position: "GK", x: 50, y: 95 },
    { position: "DF", x: 20, y: 75 },
    { position: "DF", x: 40, y: 80 },
    { position: "DF", x: 60, y: 80 },
    { position: "DF", x: 80, y: 75 },
    { position: "MF", x: 35, y: 60 },
    { position: "MF", x: 65, y: 60 },
    { position: "MF", x: 25, y: 40 },
    { position: "MF", x: 50, y: 35 },
    { position: "MF", x: 75, y: 40 },
    { position: "FW", x: 50, y: 20 },
  ],
  "3-5-2": [
    { position: "GK", x: 50, y: 95 },
    { position: "DF", x: 30, y: 75 },
    { position: "DF", x: 50, y: 80 },
    { position: "DF", x: 70, y: 75 },
    { position: "MF", x: 15, y: 55 },
    { position: "MF", x: 35, y: 60 },
    { position: "MF", x: 50, y: 50 },
    { position: "MF", x: 65, y: 60 },
    { position: "MF", x: 85, y: 55 },
    { position: "FW", x: 35, y: 25 },
    { position: "FW", x: 65, y: 25 },
  ],
  "3-4-3": [
    { position: "GK", x: 50, y: 95 },
    { position: "DF", x: 30, y: 75 },
    { position: "DF", x: 50, y: 80 },
    { position: "DF", x: 70, y: 75 },
    { position: "MF", x: 25, y: 55 },
    { position: "MF", x: 45, y: 50 },
    { position: "MF", x: 55, y: 50 },
    { position: "MF", x: 75, y: 55 },
    { position: "FW", x: 25, y: 25 },
    { position: "FW", x: 50, y: 20 },
    { position: "FW", x: 75, y: 25 },
  ],
}

export function getTeamById(id: string): Team | undefined {
  return CSL_TEAMS.find((team) => team.id === id)
}

export function getMatchesByRound(round: number): Match[] {
  return UPCOMING_MATCHES.filter((match) => match.round === round)
}

export function getPlayersByTeam(teamId: string): Player[] {
  return MOCK_PLAYERS.filter((player) => player.teamId === teamId)
}
