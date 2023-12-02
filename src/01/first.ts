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

export function solution(input: string[]): number {
  return input.reduce((sum, code) => {
    const [first, ...rest] = code.match(/\d/g) ?? []

    const value = Number(`${first}${rest.pop() ?? first}`)

    return sum + value
  }, 0)
}