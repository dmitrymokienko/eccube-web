export const uuidRegex =
  /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g

export function replaceUUID(str: string, replacement: string = ''): string {
  return str.replace(uuidRegex, replacement)
}

export function replaceCustomPrefix(
  str: string,
  prefix: string = '___',
  replacement: string = ''
): string {
  return str.replace(new RegExp(`${prefix}`, 'g'), replacement)
}
