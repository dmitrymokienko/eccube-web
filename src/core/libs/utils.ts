export type AppMode = 'development' | 'production'

export function getAppMode() {
  const mode = import.meta.env.VITE_APP_MODE || 'production'
  if (['development', 'production'].includes(mode)) return mode as AppMode
  throw new Error(`App mode error: ${mode}`)
}

export function isDevelopment(): boolean {
  return getAppMode() === 'development'
}
export function isProduction(): boolean {
  return getAppMode() === 'production'
}
