export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function omit<T extends object, K extends keyof T>(keys: K[], obj: T): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K))
  ) as Omit<T, K>
}

export function isEmpty(value: unknown): boolean {
  if (value == null) return true
  if (typeof value === 'boolean') return false
  if (typeof value === 'number') return false
  if (typeof value === 'string') return value.trim().length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  if (Array.isArray(value)) return value.length === 0
  if (value instanceof Map || value instanceof Set) return value.size === 0
  return false
}

export function createQueryParams(
  params?: Record<string, string | number | boolean | null | undefined>
) {
  if (!params) return ''
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => searchParams.append(key, val))
    } else if (value !== undefined) {
      searchParams.append(key, `${value}`)
    }
  })
  return searchParams.toString()
}
