import { Almanac } from './input'
import { SeedMapRange } from './seedMapRange'
import { SeedRange } from './seedRange'

export function solve(almanac: Almanac): number {
  const seedRanges = getSeedRanges(almanac)

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

  // calculate intervals where seedRanges and mapRanges[startIndex] intersect
  // ^ we may only care about startIndex? since anything past that is going to be bigger than min anyways?
  const intervals = calculateIntervals(map.ranges, seedRanges)

  // run those intervals through the maps, or just run startIndex's

  // const value = map.getDestinationValue(previousResult.value)

  console.log(map.destination, intervals.map(range => range.start), '\n\n\n')

  return readSeedRanges(almanac, index + 1, intervals)
}

export function calculateIntervals(mapRanges: SeedMapRange[], seedRanges: SeedRange[]): SeedRange[] {
  return seedRanges.reduce<SeedRange[]>((intervals, seedRange) => {

    const mapRangesThatIntersect = mapRanges
      .filter(mapRange => mapRange.intersects(seedRange))

    if (mapRangesThatIntersect.length) {
      intervals.push(...mapRangesThatIntersect.map(mapRange => {
        // console.log({
        //   mapRange: { source: [mapRange.source.start, mapRange.source.end], destination: [mapRange.destination.start, mapRange.destination.end], offset: mapRange.offset },
        //   seedRange: [seedRange.start, seedRange.end],
        //   newSeed: seedRange.start + mapRange.offset,
        // })

        return new SeedRange(seedRange.start + mapRange.offset, 0)
      }))

      const [firstMap] = mapRangesThatIntersect
      const initialGap = firstMap.source.start - seedRange.start

      if (initialGap > 0) {
        intervals.push(new SeedRange(seedRange.start, initialGap))
      }
    } else {
      intervals.push(new SeedRange(seedRange.start, 0))
    }

    return intervals
  }, [])
}
