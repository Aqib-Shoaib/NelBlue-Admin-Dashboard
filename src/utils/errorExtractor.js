// src/utils/errorExtractor.js
// Extract a human-friendly error message from Axios/fetch/native errors
export function extractErrorMessage(error) {
  try {
    // Axios error with response from server
    if (error && error.response) {
      const data = error.response.data;
      // Common API shapes
      if (data) {
        if (typeof data.message === 'string' && data.message.trim()) return data.message;
        if (typeof data.error === 'string' && data.error.trim()) return data.error;
        if (Array.isArray(data.errors) && data.errors.length) {
          // errors could be array of strings or objects with message/msg
          const first = data.errors[0];
          if (typeof first === 'string') return first;
          if (first && (first.message || first.msg)) return first.message || first.msg;
        }
      }
      // Fallback to status text if available
      if (error.response.statusText) return error.response.statusText;
    }

    // Axios error without response (network, CORS, timeout)
    if (error && error.request && !error.response) {
      return 'Network error. Please check your connection and try again.';
    }

    // Generic JS error
    if (error && typeof error.message === 'string') return error.message;
  } catch (_) {
    // Swallow extractor failures and continue to default
  }

    // Final fallback
  return 'An unexpected error occurred. Please try again.';
}
