import { SeedMapRange } from './seedMapRange'

export class SeedMap {
  public readonly source: string
  public readonly destination: string
  private readonly ranges: SeedMapRange[] = []

  public constructor(source: string, destination: string) {
    this.source = source
    this.destination = destination
  }

  public addRange(destinationStart: number, sourceStart: number, rangeLength: number): void {
    this.ranges.push(new SeedMapRange(destinationStart, sourceStart, rangeLength))
  }

  public getDestinationValue(sourceValue: number): number {
    const range = this.ranges.find(({ sourceStart, sourceEnd }) => sourceValue >= sourceStart && sourceValue <= sourceEnd)

    if (!range) {
      return sourceValue
    }

    const offset = range.getOffset(sourceValue)

    return range.destinationStart + offset
  }
}