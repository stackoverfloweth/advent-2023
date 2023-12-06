import { Almanac } from './input'

export async function solve(almanac: Almanac): Promise<number> {
  const seeds = calculateSeeds(almanac)

  const promises = seeds.map(({ startIndex, length }) => new Promise<number>(resolve => {
    let minLocation = Infinity

    for (let index = startIndex; index < startIndex + length; index++) {
      const result = readSeed(almanac, { index: 0, value: index })

      if (result < minLocation) {
        minLocation = result
      }
    }

    resolve(minLocation)
  }))

  const minValues = await Promise.all(promises)

  return minValues.reduce((min, value) => value < min ? value : min, Infinity)
}

export function calculateSeeds(almanac: Almanac): { startIndex: number, length: number }[] {
  const seeds: { startIndex: number, length: number }[] = []

  for (let index = 0; index < almanac.seeds.length; index += 2) {
    const startIndex = almanac.seeds[index]
    const length = almanac.seeds[index + 1]

    seeds.push({ startIndex, length })
  }

  return seeds
}

export type MapResult = { value: number, index: number }
export function readSeed(almanac: Almanac, previousResult: MapResult): number {
  const nextMap = almanac.maps[previousResult.index]

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!nextMap) {
    return previousResult.value
  }

  const value = nextMap.getDestinationValue(previousResult.value)

  return readSeed(almanac, {
    index: previousResult.index + 1,
    value,
  })
}