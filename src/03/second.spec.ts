import { expect, test } from 'vitest'
import { example, input, parseInput } from './input'
import { solve } from './second'

test('given test input, always returns 467835', () => {
  const parsed = parseInput(example)

  const response = solve(parsed)

  expect(response).toBe(467835)
})

test('given actual input, always returns 80179647', () => {
  const parsed = parseInput(input)

  const response = solve(parsed)

  expect(response).toBe(80179647)
})