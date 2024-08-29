import { Nullable } from "@/shared/types/utilities"
import { format, parseISO } from "date-fns"


export const GERMANY_DATE_FORMAT = 'dd.MM.yyyy'


export function convertToTimestamp(date: Nullable<Date>): Nullable<number> {
  if (!date) return undefined
  return date.getTime()
}

export function convertToDate(date: Nullable<string>): Nullable<Date> {
  if (!date) return undefined
  return parseISO(date)
}


export function formatDate(dateString: Nullable<string>, options?: {
  dateFormat?: string
}): string {
  if (!dateString) return ''
  const date = parseISO(dateString)
  if (!date) return ''
  const { dateFormat = GERMANY_DATE_FORMAT } = options || {}
  return format(date, dateFormat)
}