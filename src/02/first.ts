import { Color, Game, Reveals, isGame } from './input'

const maxColors: Record<Color, number> = {
  red: 12,
  green: 13,
  blue: 14,
} as const

export function solve(games: Game[]): number {
  return games.reduce((sum, game) => {
    if (isWithinMax(game)) {
      return sum + game.id
    }

    return sum
  }, 0)
}

export function isWithinMax(game: Game): boolean
export function isWithinMax(reveals: Reveals): boolean
export function isWithinMax(gameOrReveals: Game | Reveals): boolean {
  if (isGame(gameOrReveals)) {
    return gameOrReveals.reveals.every(isWithinMax)
  }

  return gameOrReveals.every(reveal => {
    return reveal.count <= maxColors[reveal.color]
  })
}