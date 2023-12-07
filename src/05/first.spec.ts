import { expect, test } from 'vitest'
import { solve } from './first'
import { example, input, parseInput } from './input'

test('given test input, always return 35', () => {
  const parsed = parseInput(example)

  const response = solve(parsed)

  expect(response).toBe(35)
})

test.skip('given actual input, always return 31599214', () => {
  const parsed = parseInput(input)

  const response = solve(parsed)

  expect(response).toBe(31599214)
})