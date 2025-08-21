// Helper to normalize service responses
export function normalize(res) {
  // If service already returns standardized shape
  if (res && typeof res === 'object' && 'success' in res) {
    if (res.success) return res.data;
    // Throwing triggers React Query error state
    throw new Error(res.message || 'Request failed');
  }
  // Otherwise assume raw data
  return res;
}