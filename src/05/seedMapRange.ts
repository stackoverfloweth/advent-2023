export class SeedMapRange {
  public destinationStart: number
  public sourceStart: number
  public rangeLength: number

  public constructor(destinationStart: number, sourceStart: number, rangeLength: number) {
    this.destinationStart = destinationStart
    this.sourceStart = sourceStart
    this.rangeLength = rangeLength
  }

  public get sourceEnd(): number {
    return this.sourceStart + this.rangeLength
  }

  public get destinationEnd(): number {
    return this.destinationStart + this.rangeLength
  }

  public getOffset(sourceValue: number): number {
    if (sourceValue < this.sourceStart || sourceValue > this.sourceEnd) {
      throw 'invalid source value for range'
    }

    return sourceValue - this.sourceStart
  }
}