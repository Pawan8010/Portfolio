/**
 * Pure calculation helper to determine scroll percentage clamped between 0 and 100.
 */
export function calculateScrollPercentage(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number
): number {
  const scrollableDistance = scrollHeight - clientHeight;
  if (scrollableDistance <= 0) return 0;
  
  const percentage = (scrollTop / scrollableDistance) * 100;
  return Math.min(100, Math.max(0, percentage));
}
