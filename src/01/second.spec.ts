import { expect, test } from 'vitest'
import { example2, input } from '@/01/input'
import { getDigits, solution, toNumber } from '@/01/second'

test('given test input, always returns 281', () => {
  const input = example2.split('\n')

  const response = solution(input)

  expect(response).toBe(281)
})

test.each([
  ['one', 1],
  ['two', 2],
  ['three', 3],
  ['four', 4],
  ['five', 5],
  ['six', 6],
  ['seven', 7],
  ['eight', 8],
  ['nine', 9],
])('toNumber', (value, actual) => {
  const response = toNumber(value)

  expect(response).toBe(actual)
})

test('getDigits, given 2 numbers that share a letter, finds each number', () => {
  const input = 'eighthree'

  const response = getDigits(input)

  expect(response).toMatchObject([8, 3])
})

test('given actual input, always returns correct answer', () => {
  const response = solution(input.split('\n'))

  expect(response).toBe(54719)
})