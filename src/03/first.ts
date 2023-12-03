import { JsonKeyMap } from './jsonKeyMap'

export function solve(input: string[]): number {
  const indicatorLocations = findIndicatorLocations(input)
  const partNumberLocations = findPartNumberLocations(input)
  const map = createMap(input)

  const partNumbers = indicatorLocations.reduce((value, location) => {
    findNeighboringPartNumbers(map, location.coord).forEach(coord => {
      const partNumber = findPartNumberByCoord(coord, partNumberLocations)

      if (partNumber) {
        value.set(partNumber.coord, Number(partNumber.value))
      }
    })

    return value
  }, new JsonKeyMap<Coord, number>())

  return partNumbers.values().reduce((sum, partNumber) => sum + partNumber, 0)
}

export type Coord = [x: number, y: number]
export type EngineLocation = { value: string, coord: Coord }
export type PartNumber = { value: number, coord: Coord }

export function findIndicatorLocations(lines: string[]): EngineLocation[] {
  return findEngineLocations(/[^\\.\w\s]/g, lines)
}

export function findPartNumberLocations(lines: string[]): EngineLocation[] {
  return findEngineLocations(/\d+/g, lines)
}

export function findEngineLocations(regex: RegExp, lines: string[]): EngineLocation[] {
  return lines.reduce<EngineLocation[]>((value, line, index) => {
    return value.concat(findEngineLocationsInLine(regex, line, index))
  }, [])
}

export function findEngineLocationsInLine(regex: RegExp, value: string, y: number): EngineLocation[] {
  const matches = value.matchAll(regex)
  const indicatorLocations: EngineLocation[] = []

  for (const { 0: value, index: x } of matches) {
    if (typeof x !== 'number') {
      throw 'invalid location'
    }

    indicatorLocations.push({
      value,
      coord: [x, y],
    })
  }

  return indicatorLocations
}

export function createMap(lines: string[]): JsonKeyMap<Coord, string> {
  const map = new JsonKeyMap<Coord, string>()

  lines.forEach((line, y) => {
    line.split('').forEach((value, x) => {
      map.set([x, y], value)
    })
  })

  return map
}

export function findNeighboringPartNumbers(map: JsonKeyMap<Coord, string>, [x, y]: Coord): Coord[] {
  const possibleLocations: { coord: Coord, value: string | undefined }[] = [
    { coord: [x - 1, y - 1], value: map.get([x - 1, y - 1]) },
    { coord: [x, y - 1], value: map.get([x, y - 1]) },
    { coord: [x + 1, y - 1], value: map.get([x + 1, y - 1]) },
    { coord: [x + 1, y], value: map.get([x + 1, y]) },
    { coord: [x + 1, y + 1], value: map.get([x + 1, y + 1]) },
    { coord: [x, y + 1], value: map.get([x, y + 1]) },
    { coord: [x - 1, y + 1], value: map.get([x - 1, y + 1]) },
    { coord: [x - 1, y], value: map.get([x - 1, y]) },
  ]

  const numberRegex = /\d/g
  return possibleLocations
    .filter(({ value }) => !!value && numberRegex.test(value))
    .map(({ coord }) => coord)
}

export function findPartNumberByCoord(coord: Coord, partNumberLocations: EngineLocation[]): EngineLocation | undefined {
  return partNumberLocations.find((partNumber) => {
    return isSameY(coord, partNumber.coord) && isWithinX(coord, partNumber.coord, partNumber.value.length)
  })
}

export function isSameY(aCoord: Coord, bCoord: Coord): boolean {
  return aCoord[1] === bCoord[1]
}

export function isWithinX(aCoord: Coord, bCoord: Coord, length: number): boolean {
  const [index] = bCoord

  return index <= aCoord[0] && index + length - 1 >= aCoord[0]
}