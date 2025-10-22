# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Chinese Super League (CSL) football match simulator built with Next.js 16, React 19, TypeScript, and Tailwind CSS. The application uses AI (via the Vercel AI SDK) to simulate football matches based on team lineups, formations, and player ratings.

## Development Commands

```bash
# Install dependencies
npm install --legacy-peer-deps

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and add your DeepSeek API key

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

**Note**: Use `--legacy-peer-deps` flag when installing to avoid peer dependency conflicts with React 19.

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```bash
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

Get your DeepSeek API key from: https://platform.deepseek.com/

## Architecture Overview

### Application Structure

The app follows Next.js App Router architecture with the following key pages:

1. **Home Page** (`app/page.tsx`): Displays CSL league rounds (20-30) and available matches
2. **Match Setup** (`app/match/[id]/page.tsx`): Interactive lineup editor where users select formations (4-3-3, 4-4-2, 3-5-2, 4-2-3-1, 3-4-3) and customize starting 11 players
3. **Simulation** (`app/simulation/[id]/page.tsx`): Runs AI simulation and displays results with commentary, stats, and predictions
4. **History** (`app/history/page.tsx`): Shows saved simulation results
5. **Leaderboard** (`app/leaderboard/page.tsx`): Rankings/predictions

### Data Flow

1. User selects a match from home page → navigates to `/match/[id]`
2. User customizes lineups and formations → data stored in `localStorage` as "current-simulation"
3. On simulation start → data sent to `/api/simulate` route
4. AI generates match events, score, analysis → streamed back using Vercel AI SDK
5. Results can be saved to `localStorage` as "saved-simulations"

### Core Data Models

Located in `lib/mock-data.ts`:

- **Team**: CSL teams with id, name, shortName, logo, city
- **Player**: Player data with id, name, number, position (GK/DF/MF/FW), teamId, rating (ability score)
- **Match**: Match fixtures with round, teams, date, venue, status
- **Formation**: Tactical formations with position layouts (x/y coordinates for field visualization)

### AI Simulation

The `/api/simulate/route.ts` API endpoint:

- Uses Vercel AI SDK v5's `streamText` with **DeepSeek Chat** model
- Configured via `@ai-sdk/deepseek` official provider package
- Requires `DEEPSEEK_API_KEY` environment variable
- Sends detailed prompt with both teams' lineups, formations, and player ratings
- Returns streaming response via `toDataStreamResponse()`
- Frontend uses direct fetch API to handle streaming (AI SDK v5 removed `useCompletion` hook)
- Expects structured JSON response with:
  - `matchAnalysis`: Pre-match tactical analysis
  - `events`: Array of match events (goals, cards, substitutions, key moments)
  - `finalScore`: Home and away goals
  - `matchSummary`: Post-match summary
  - `predictions`: Alternative score predictions with probabilities

### UI Component System

Built with shadcn/ui components (Radix UI + Tailwind CSS):

- **FootballField** (`components/football-field.tsx`): Visualizes tactical formations on a pitch
- **PlayerSelector** (`components/player-selector.tsx`): Modal for swapping players with position filtering
- **ScoreAnimation** (`components/score-animation.tsx`): Animated score reveal
- **LiveCommentary** (`components/live-commentary.tsx`): Timeline of match events
- **MatchStats** (`components/match-stats.tsx`): Statistical breakdown of simulation

## Important Technical Notes

### TypeScript Configuration

- Build errors are ignored (`ignoreBuildErrors: true` in `next.config.mjs`)
- When fixing type errors, focus on actual runtime issues, not build-blocking errors

### Styling

- Uses Tailwind CSS v4 with custom theme
- Path alias `@/*` maps to project root
- UI components follow shadcn/ui patterns with class-variance-authority for variants

### State Management

- Client-side state uses React hooks (useState, useEffect)
- Simulation data persists via `localStorage` (not a backend database)
- The `useCompletion` hook from `ai/react` manages AI streaming

### Image Handling

- Images are unoptimized (`unoptimized: true` in next.config)
- Team logos use placeholder images at `/[team-name]-fc-logo.jpg` or `/placeholder.svg`

## Development Tips

- Players are stored in `MOCK_PLAYERS` array - currently only ~20 players exist for major teams
- Formation layouts in `FORMATION_LAYOUTS` define 11 player positions per formation type
- Match data (`UPCOMING_MATCHES`) covers rounds 20-22 only
- Chinese language is used throughout the UI
- The simulation quality depends on the prompt in `app/api/simulate/route.ts`
