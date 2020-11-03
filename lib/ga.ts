export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID

export interface EventArgs {
  /** Typically the object that was interacted with (e.g. 'Video') */
  category: string
  /** The type of interaction (e.g. 'play') */
  action: string
  /** Useful for categorizing events (e.g. 'Fall Campaign') */
  label?: string
  /** A numeric value associated with the event (e.g. 42) */
  value?: number
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window.ga === 'function') {
    window.ga('send', 'pageview', url)
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: EventArgs) => {
  if (typeof window.ga === 'function') {
    window.ga('send', 'event', {
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
      eventValue: value
    })
  }
}
