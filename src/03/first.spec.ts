import { expect, test } from 'vitest'
import { solve } from './first'
import { example, input, parseInput } from './input'

test('given test input, always returns 4361', () => {
  const parsed = parseInput(example)

  const response = solve(parsed)

  expect(response).toBe(4361)
})

test('given actual input, always returns 551094', () => {
  const parsed = parseInput(input)

  const response = solve(parsed)

  expect(response).toBe(551094)
})