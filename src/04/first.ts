import { ScratchCard } from './input'

export function solve(cards: ScratchCard[]): number {
  return cards.reduce((sum, card) => sum + calculateScratchCardValue(card), 0)
}

export function calculateScratchCardValue([winningNumbers, cardNumbers]: ScratchCard): number {
  return cardNumbers.reduce<number | null>((value, number) => {
    const matches = winningNumbers.includes(number)

    if (matches) {
      return value ? value * 2 : 1
    }

    return value
  }, null) ?? 0
}