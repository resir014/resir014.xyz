import { formatDistance } from 'date-fns';

// Post dates are shown in Jakarta time, the timezone they are authored in and the one their
// Permalinks are dated in. The site is built in UTC, which would show some posts a day early.
const postDateFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Jakarta',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

export const formatPostDate = (date: Date) => postDateFormat.format(date);

export function formatRelativeTime(date: Date): string {
  return formatDistance(Date.now(), date);
}
