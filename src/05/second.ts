import { Almanac } from './input'
import { SeedRange } from './seedRange'

export function solve(almanac: Almanac): number {
  const seedRanges = getSeedRanges(almanac)
  // const seedRanges = [new SeedRange(82, 10)]

  return readSeedRanges(almanac, seedRanges)
}

export function getSeedRanges(almanac: Almanac): SeedRange[] {
  const seeds: SeedRange[] = []

  for (let index = 0; index < almanac.seeds.length; index += 2) {
    const startIndex = almanac.seeds[index]
    const length = almanac.seeds[index + 1]

    seeds.push(new SeedRange(startIndex, length))
  }

  return seeds
}

export function readSeedRanges(almanac: Almanac, seedRanges: SeedRange[]): number {
  return seedRanges.reduce((min, seedRange) => {
    const value = readSeedRange(almanac, seedRange)

    return value < min ? value : min
  }, Infinity)
}

export function readSeedRange(almanac: Almanac, seedRange: SeedRange): number {
  return new Array(seedRange.length)
    .fill(seedRange.start)
    .map((value, index) => reedSeed(almanac, 0, value + index))
    .reduce((min, value) => value < min ? value : min, Infinity)
}

export function reedSeed(almanac: Almanac, index: number, previousValue: number): number {
  const map = almanac.maps[index]

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!map) {
    return previousValue
  }


  const mapsThatIntersect = map.ranges.filter(range => range.intersects(new SeedRange(index, 0)))

  const nextValue = mapsThatIntersect.length
    ? Math.min(...mapsThatIntersect.map(map => map.offset + previousValue))
    : previousValue


  return reedSeed(almanac, index + 1, nextValue)
}
