/**
 * Diwali Festive Theme Utility for Parmaarth Infratech Pvt. Ltd.
 *
 * Configured to automatically run during Diwali week and auto-revert to the
 * standard original engineering theme once the date passes.
 */

// Auto-revert expiration timestamp: November 15, 2026, 23:59:59 IST (+05:30)
export const DIWALI_EXPIRY_TIMESTAMP = new Date('2026-11-15T23:59:59+05:30').getTime();

/**
 * Checks whether the Diwali festive theme should be active.
 * Auto-reverts strictly based on date without requiring any manual toggle button.
 * Supports URL override (?theme=diwali or ?theme=default) for testing/verification.
 */
export function isDiwaliThemeActive(): boolean {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const themeParam = urlParams.get('theme');
    if (themeParam === 'diwali') return true;
    if (themeParam === 'default') return false;
  }

  // Active during this week up to DIWALI_EXPIRY_TIMESTAMP
  return Date.now() <= DIWALI_EXPIRY_TIMESTAMP;
}
