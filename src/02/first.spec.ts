import { expect, test } from 'vitest'
import { solve } from './first'
import { example1Parsed, exampleInput, input, parseInput } from './input'

test('parseInput given example input, always returns correct ids', () => {
  const response = parseInput(exampleInput)

  expect(response).toMatchObject(example1Parsed)
})

test('given test input, always return expected output', () => {
  const games = parseInput(exampleInput)

  const response = solve(games)

  expect(response).toBe(8)
})

test('given actual input, always return expected output', () => {
  const games = parseInput(input)

  const response = solve(games)

  expect(response).toBe(2551)
})