import { describe, test, expect } from 'vitest'
import { SeedMapRange } from './seedMapRange'
import { SeedRange } from './seedRange'

describe('seedMapRange', () => {
  test('given example input, returns expected', () => {
    const range = new SeedMapRange(50, 10, 10)
    // source 10, 11, 12, 13, ...19
    // destination 50, 51, 51, 53... 59
    const testCase = new SeedRange(9, 2)

    const response = range.intersects(testCase)

    expect(response).toBeTruthy()
  })
})