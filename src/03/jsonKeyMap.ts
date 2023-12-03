export class JsonKeyMap<TKey, TValue> {
  private readonly map = new Map<string, TValue>

  private toKey(value: TKey): string {
    return JSON.stringify(value)
  }

  public set(key: TKey, value: TValue): void {
    this.map.set(this.toKey(key), value)
  }

  public get(key: TKey): TValue | undefined {
    return this.map.get(this.toKey(key))
  }

  public values(): TValue[] {
    return Array.from(this.map.values())
  }
}