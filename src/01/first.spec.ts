import { expect, test } from 'vitest'
import { solve } from '@/01/first'

test('always returns 123', () => {
  const response = solve()

  expect(response).toBe('123')
})