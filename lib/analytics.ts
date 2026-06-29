/**
 * Analytics helpers — sends tracking events to the Laravel backend.
 * All calls are fire-and-forget; failures are silently swallowed so
 * they never affect the user experience.
 *
 * Laravel endpoints expected:
 *   POST /api/analytics/event
 *   POST /api/analytics/error
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function post(path: string, body: Record<string, unknown>): Promise<void> {
  if (!API_URL) return;
  try {
    await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      // keepalive lets the request complete even if the page unloads
      keepalive: true,
    });
  } catch {
    // never throw — analytics must not break the page
  }
}

export function trackPageView(path: string, title: string): void {
  post('/analytics/event', {
    type: 'page_view',
    path,
    title,
    timestamp: new Date().toISOString(),
  });
}

export function trackButtonClick(buttonName: string, section: string): void {
  post('/analytics/event', {
    type: 'button_click',
    buttonName,
    section,
    timestamp: new Date().toISOString(),
  });
}

export function trackFormSubmission(formName: string, success: boolean): void {
  post('/analytics/event', {
    type: 'form_submission',
    formName,
    success,
    timestamp: new Date().toISOString(),
  });
}

export function logCustomError(
  message: string,
  context: Record<string, unknown>
): void {
  post('/analytics/error', {
    message,
    context,
    timestamp: new Date().toISOString(),
  });
}
