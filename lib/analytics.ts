export async function trackPageView(path: string, title: string) {
  try {
    await fetch('/api/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'page_view', path, title, timestamp: new Date().toISOString() }),
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

export async function trackButtonClick(buttonName: string, section: string) {
  try {
    await fetch('/api/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'button_click', buttonName, section, timestamp: new Date().toISOString() }),
    });
  } catch (error) {
    console.error('Failed to track button click:', error);
  }
}

export async function trackFormSubmission(formName: string, success: boolean) {
  try {
    await fetch('/api/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'form_submission', formName, success, timestamp: new Date().toISOString() }),
    });
  } catch (error) {
    console.error('Failed to track form submission:', error);
  }
}

export async function logCustomError(message: string, context: Record<string, any>) {
  try {
    await fetch('/api/analytics/error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context, timestamp: new Date().toISOString() }),
    });
  } catch (error) {
    console.error('Failed to log error:', error);
  }
}