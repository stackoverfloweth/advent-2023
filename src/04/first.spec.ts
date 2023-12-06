import { expect, test } from 'vitest'
import { solve } from './first'
import { exampleInput, input, parseInput } from './input'

test('given test input, always returns 13', () => {
  const parsed = parseInput(exampleInput)

  const response = solve(parsed)

  expect(response).toBe(13)
})

test('given actual input, always returns 23678', () => {
  const parsed = parseInput(input)

  const response = solve(parsed)

  expect(response).toBe(23678)
})