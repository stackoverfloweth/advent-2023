export class SeedRange {
  public start: number
  public length: number

  public constructor(start: number, length: number) {
    this.start = start
    this.length = Math.max(length - 1, 0)
  }

  public get end(): number {
    return this.start + this.length
  }
}