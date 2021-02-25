import { format, formatDistance } from 'date-fns'

export const formatPostDate = (date: Date) => `${format(date, 'dd MMMM yyyy')}`

export function formatRelativeTime(date: Date): string {
  return formatDistance(Date.now(), date)
}
