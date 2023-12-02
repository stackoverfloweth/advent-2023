import { Color, Game } from './input'

export function solve(games: Game[]): number {
  return games.reduce((sum, game) => {
    const power = calculatePower(game)

    return sum + power
  }, 0)
}

export function calculatePower(game: Game): number {
  const groups = groupByColor(game)
  const minCounts = groups.map(({ counts }) => Math.max(...counts))

  return minCounts.reduce((product, count) => product * count, 1)
}

export function groupByColor(game: Game): { color: Color, counts: number[] }[] {
  return game.reveals.flatMap(reveal => reveal).reduce<{ color: Color, counts: number[] }[]>((groups, { color, count }) => {
    const group = groups.find(group => group.color === color)
    if (!group) {
      return [...groups, { color, counts: [count] }]
    }

    group.counts.push(count)

    return groups
  }, [])
}