import { SeedRange } from './seedRange'
export class SeedMapRange {
  public source: SeedRange
  public destination: SeedRange

  public constructor(destinationStart: number, sourceStart: number, rangeLength: number) {
    this.source = new SeedRange(sourceStart, rangeLength)
    this.destination = new SeedRange(destinationStart, rangeLength)
  }

  public intersects(target: SeedRange): boolean {
    return !(this.source.end < target.start || target.end < this.source.start)
  }

  public get offset(): number {
    return this.destination.start - this.source.start
  }
}