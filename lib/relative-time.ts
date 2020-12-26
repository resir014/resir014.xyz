import formatDistance from 'date-fns/formatDistance'

function relativeTime(date: Date): string {
  return formatDistance(Date.now(), date)
}

export default relativeTime
