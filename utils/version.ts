/**
 * Generates build version in format yyyy.mdd.b
 * where:
 * - yyyy = year
 * - m = month (1-12)
 * - dd = day (01-31)
 * - b = build number (increments throughout the day)
 */
export function getBuildVersion(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1 // 0-indexed, so add 1
  const day = now.getDate().toString().padStart(2, '0')
  
  // For build number, we'll use hour of day (0-23) as a simple incrementing value
  // In a real CI/CD environment, this would come from an environment variable
  const buildNumber = process.env.BUILD_NUMBER || now.getHours().toString()
  
  return `${year}.${month}${day}.${buildNumber}`
}

/**
 * Gets version from environment or generates it
 */
export function getVersion(): string {
  // Check if version is set in environment (for production builds)
  if (process.env.APP_VERSION) {
    return process.env.APP_VERSION
  }
  
  // Otherwise generate it dynamically
  return getBuildVersion()
}
