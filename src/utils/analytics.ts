// Google Analytics 4 Event Tracking Utilities

export interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export function trackEvent({ action, category, label, value }: GAEvent) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

export function trackPageView(url: string, title: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'G-XXXXXXXXXX', {
      page_path: url,
      page_title: title,
    });
  }
}

export function trackFormSubmission(formName: string) {
  trackEvent({
    action: 'form_submission',
    category: 'engagement',
    label: formName,
  });
}

export function trackButtonClick(buttonName: string) {
  trackEvent({
    action: 'button_click',
    category: 'engagement',
    label: buttonName,
  });
}

export function trackServiceView(serviceName: string) {
  trackEvent({
    action: 'service_view',
    category: 'services',
    label: serviceName,
  });
}

export function trackLanguageSwitch(fromLang: string, toLang: string) {
  trackEvent({
    action: 'language_switch',
    category: 'navigation',
    label: `${fromLang}_to_${toLang}`,
  });
}

// Conversion tracking
export function trackConversion(conversionType: string, value?: number) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
      value: value,
      currency: 'IDR',
      transaction_id: '',
    });
  }
  
  trackEvent({
    action: 'conversion',
    category: 'conversions',
    label: conversionType,
    value: value,
  });
}

// E-commerce tracking (if needed)
export function trackPurchase(transactionId: string, value: number, items: any[]) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'IDR',
      items: items,
    });
  }
}

// User engagement metrics
export function trackScrollDepth(depth: number) {
  trackEvent({
    action: 'scroll_depth',
    category: 'engagement',
    label: `${depth}%`,
    value: depth,
  });
}

export function trackTimeOnPage(seconds: number) {
  trackEvent({
    action: 'time_on_page',
    category: 'engagement',
    value: seconds,
  });
}

// Error tracking
export function trackError(errorMessage: string, errorType: string) {
  trackEvent({
    action: 'error',
    category: 'errors',
    label: `${errorType}: ${errorMessage}`,
  });
}

// Social sharing tracking
export function trackSocialShare(platform: string, url: string) {
  trackEvent({
    action: 'social_share',
    category: 'social',
    label: `${platform}: ${url}`,
  });
}

// Download tracking
export function trackDownload(fileName: string) {
  trackEvent({
    action: 'file_download',
    category: 'downloads',
    label: fileName,
  });
}

// Outbound link tracking
export function trackOutboundLink(url: string) {
  trackEvent({
    action: 'outbound_link',
    category: 'navigation',
    label: url,
  });
}
