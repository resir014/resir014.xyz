import format from 'date-fns/format'
import formatDistance from 'date-fns/formatDistance'

export const formatPostDate = (date: Date) => `${format(date, 'dd MMMM yyyy')}`

export function formatRelativeTime(date: Date): string {
  return formatDistance(Date.now(), date)
}
