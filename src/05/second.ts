import { Almanac } from './input'
import { SeedMapRange } from './seedMapRange'
import { SeedRange } from './seedRange'

export function solve(almanac: Almanac): number {
  // const seedRanges = getSeedRanges(almanac)
  const seedRanges = [new SeedRange(82, 1)]

  return readSeedRanges(almanac, 0, seedRanges)
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

export function readSeedRanges(almanac: Almanac, index: number, seedRanges: SeedRange[]): number {
  const map = almanac.maps[index]

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!map) {
    return seedRanges.reduce((min, seedRange) => seedRange.start < min ? seedRange.start : min, Infinity)
  }


  const next = seedRanges.map(seedRange => {
    let mapMin = Infinity
    for (let i = 0; i < seedRange.end; i++) {
      const mapsThatIntersect = map.ranges.filter(range => range.intersects(new SeedRange(i, 0)))

      if (mapsThatIntersect.length === 0 && i < mapMin) {
        mapMin = i
      } else {
        const mapValue = Math.min(...mapsThatIntersect.map(range => i + range.offset))
        if (mapValue < mapMin) {
          mapMin = mapValue
        }
      }
    }

    return mapMin
  })


  return readSeedRanges(almanac, index + 1, next.map(value => new SeedRange(value, 0)))
}
