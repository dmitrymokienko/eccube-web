export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function omit<T extends object, K extends keyof T>(keys: K[], obj: T): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K))
  ) as Omit<T, K>
}
