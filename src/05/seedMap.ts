import { SeedMapRange } from './seedMapRange'

export class SeedMap {
  public readonly source: string
  public readonly destination: string
  public readonly ranges: SeedMapRange[] = []

  public constructor(source: string, destination: string) {
    this.source = source
    this.destination = destination
  }

  public addRange(destinationStart: number, sourceStart: number, rangeLength: number): void {
    this.ranges.push(new SeedMapRange(destinationStart, sourceStart, rangeLength))
    this.ranges.sort((aRange, bRange) => aRange.source.start - bRange.source.start)
  }
}