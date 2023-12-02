import { expect, expectTypeOf, test } from 'vitest'
import { Solution, solution } from '@/01/first'
import { Example1, example1, input } from '@/01/input'

test('given test input, always returns 142', () => {
  type Response = Solution<Example1>
  const input = example1.split('\n')

  const response = solution(input)

  expectTypeOf<Response>().toMatchTypeOf<142>()
  expect(response).toBe(142)
})

test('given actual input, always returns correct answer', () => {
  const response = solution(input.split('\n'))

  expect(response).toBe(55971)
})