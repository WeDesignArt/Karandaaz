// lib/gtag.tsx

// Replace with your GA4 Measurement ID
export const GA_TRACKING_ID = 'G-GJ8FPBRPCB'

/**
 * Track a pageview.
 * @param {string} url - The URL of the page.
 */
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      event: 'page_view',
      page_path: url,
    })
  }
}

/**
 * Track a custom event.
 * @param {Object} options - Event options.
 * @param {string} options.action - Event action (e.g., 'click').
 * @param {string} options.category - Event category (e.g., 'Button').
 * @param {string} options.label - Event label (e.g., 'Subscribe Button').
 * @param {number} [options.value] - Event value (optional).
 */
export const event = ({
  action,
  category,
  label,
  value,
  title,
}: {
  action: string
  category: string
  label: string
  value?: number
  title?: string
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      title: title,
    })
  }
}
