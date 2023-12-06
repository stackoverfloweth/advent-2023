import { expect, test } from 'vitest'
import { exampleInput, input, parseInput } from './input'
import { solve } from './second'

test('given test input, always returns 30', () => {
  const parsed = parseInput(exampleInput)

  const response = solve(parsed)

  expect(response).toBe(30)
})

test('given actual input, always returns 15455663', () => {
  const parsed = parseInput(input)

  const response = solve(parsed)

  expect(response).toBe(15455663)
})