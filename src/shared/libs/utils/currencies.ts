export function transformAmountToCents(amount: string): number | undefined {
  if (!amount) return undefined
  return Math.round(parseFloat(amount) * 100)
}

export function transformCentsToAmount(cents: number): string | undefined {
  if (!cents && cents !== 0) return undefined
  return (cents / 100).toFixed(2)
}
