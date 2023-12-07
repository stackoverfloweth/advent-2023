import { Almanac } from './input'
import { SeedMapRange } from './seedMapRange'
import { SeedRange } from './seedRange'

export function solve(almanac: Almanac): number {
  const seedRanges = getSeedRanges(almanac)

  return readSeedRanges(almanac, 0, seedRanges)
}

export function getSeedRanges(almanac: Almanac): SeedRange[] {
  return almanac.seeds.map(seed => new SeedRange(seed, 0))
}

export function readSeedRanges(almanac: Almanac, index: number, seedRanges: SeedRange[]): number {
  const map = almanac.maps[index]

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!map) {
    return seedRanges.reduce((min, seedRange) => seedRange.start < min ? seedRange.start : min, Infinity)
  }

  const intervals = calculateIntervals(map.ranges, seedRanges)

  return readSeedRanges(almanac, index + 1, intervals)
}

export function calculateIntervals(mapRanges: SeedMapRange[], seedRanges: SeedRange[]): SeedRange[] {
  return seedRanges.reduce<SeedRange[]>((intervals, seedRange) => {

    const mapRangesThatIntersect = mapRanges
      .filter(mapRange => mapRange.intersects(seedRange))
      .map(mapRange => new SeedRange(seedRange.start + mapRange.offset, 0))

    if (mapRangesThatIntersect.length) {
      intervals.push(...mapRangesThatIntersect)
    } else {
      intervals.push(new SeedRange(seedRange.start, 0))
    }

    return intervals
  }, [])
}
