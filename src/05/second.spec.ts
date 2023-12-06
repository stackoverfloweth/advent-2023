import { expect, test } from 'vitest'
import { example, input, parseInput } from './input'
import { solve } from './second'

test('given test input, always return 46', async () => {
  const parsed = parseInput(example)

  const response = await solve(parsed)

  expect(response).toBe(46)
})

test('given actual input, always return 31599214', async () => {
  const parsed = parseInput(input)

  const response = await solve(parsed)

  expect(response).toBe(31599214)
})

// too high 20358600
// too high 5072215