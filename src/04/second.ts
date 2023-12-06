import { ScratchCard } from './input'

export function solve(cards: ScratchCard[]): number {
  const cardCounts = new CardCounts(cards.length)

  cards.forEach((card, index) => {
    const value = calculateScratchCardValue(card)

    cardCounts.incrementNextBlock(index, value)
  })

  return cardCounts.sum()
}

export function calculateScratchCardValue([winningNumbers, cardNumbers]: ScratchCard): number {
  return cardNumbers.reduce((sum, number) => {
    const matches = winningNumbers.includes(number)

    return matches ? ++sum : sum
  }, 0)
}

export class CardCounts {
  private readonly counts: number[]

  public constructor(length: number) {
    this.counts = new Array(length).fill(1)
  }

  public get(index: number): number {
    return this.counts[index]
  }

  public incrementNextBlock(index: number, blockSize: number): void {
    if (blockSize === 0) {
      return
    }

    const multiplier = this.get(index)

    for (let i = index + 1; i <= index + blockSize; i++) {
      this.counts[i] += multiplier
    }
  }

  public sum(): number {
    return this.counts.reduce((sum, count) => sum + count, 0)
  }
}