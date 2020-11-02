import format from 'date-fns/format'
import formatDistance from 'date-fns/formatDistance'

export const formatPostDate = (date: Date) => `${format(date, 'dd MMMM yyyy')}`

export const formatRelativeTime = (date: Date) => `${formatDistance(Date.now(), date)} ago`
