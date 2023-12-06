import { Almanac } from './input'
import { SeedMap } from './seedMap'

export function solve(almanac: Almanac): number {
  const results = almanac.seeds.map(seed => readSeed(almanac, [{ map: 'seed', value: seed }]))

  return results.reduce<number>((minLocation, result) => {
    const locationValue = result.find(({ map }) => map === 'location')

    return locationValue?.value && locationValue.value < minLocation ? locationValue.value : minLocation
  }, Infinity)
}

export type MapResult = { map: string, value: number }
export function readSeed(almanac: Almanac, results: MapResult[]): MapResult[] {
  const last = results[results.length - 1]
  const nextMap = almanac.maps.find(map => map.source === last.map)

  if (!nextMap) {
    return results
  }

  results.push(readMap(last.value, nextMap))

  return readSeed(almanac, results)
}

export function readMap(value: number, map: SeedMap): MapResult {
  return {
    map: map.destination,
    value: map.getDestinationValue(value),
  }
}