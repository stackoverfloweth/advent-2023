export type Count<T extends { length: number }> = T['length'] & number

export type ToArray<TLength extends number, TValues extends unknown[] = []> = TValues extends { length: TLength } ? TValues : ToArray<TLength, [null, ...TValues]>

export type Sum<A extends number, B extends number> = Count<[...ToArray<A>, ...ToArray<B>]>

export type Combine<A extends number, B extends number> = ToNumber<`${A}${B}`>

export type ToNumber<T extends string> = T extends `${infer NumberValue extends number}`
  ? NumberValue
  : never

export type Split<T extends string> = T extends `${infer First}${infer Rest}` ? [First, ...Split<Rest>] : []

export type NumbersOnly<T extends unknown[], TReturn extends number[] = []> = T extends [infer First extends string, ...infer Rest]
  ? ToNumber<First> extends never
    ? NumbersOnly<Rest, TReturn>
    : NumbersOnly<Rest, [...TReturn, ToNumber<First>]>
  : TReturn

export type First<TArray extends number[]> = TArray extends [infer First extends number, ...number[]]
  ? First
  : 0

export type Last<TArray extends number[]> = TArray extends [...number[], infer Last extends number]
  ? Last
  : 0

export type Decode<T extends string, TArray extends number[] = NumbersOnly<Split<T>>> = Combine<First<TArray>, Last<TArray>>

export type Solution<T extends Readonly<string[]>, TSum extends number = 0> = T extends [infer Code extends string, ...infer Rest extends string[]]
  ? Solution<Rest, Sum<TSum, Decode<Code>>>
  : TSum

const digitStrings = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

function getFirstDigit(value: string): string {
  return [...digitStrings, ...digits].reduce<{ index: number, value: string }>((first, pattern) => {
    const index = value.indexOf(pattern)

    if (index === -1 || index > first.index) {
      return first
    }

    return {
      index,
      value: pattern,
    }
  }, {
    index: Infinity,
    value: '',
  }).value
}

function getLastDigit(value: string): string {
  return [...digitStrings, ...digits].reduce<{ index: number, value: string }>((last, pattern) => {
    const index = value.lastIndexOf(pattern)

    if (index > last.index) {
      return {
        index,
        value: pattern,
      }
    }

    return last
  }, {
    index: -Infinity,
    value: '',
  }).value
}

export function toNumber(value: string | undefined): number {
  const index = digitStrings.indexOf(value ?? '')

  if (index === -1) {
    return Number(value)
  }

  return index + 1
}

export function getDigits(value: string): [number, number] {
  const first = getFirstDigit(value)
  const last = getLastDigit(value)

  return [toNumber(first), toNumber(last)]
}

export function solution(input: string[]): number {
  return input.reduce((sum, code) => {
    const [first, last] = getDigits(code)
    const value = Number(`${first}${last}`)

    return sum + value
  }, 0)
}