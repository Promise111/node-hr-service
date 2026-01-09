/**
 * Utility function to simulate a delay (e.g., external API call)
 * @param minMs Minimum delay in milliseconds (default: 200)
 * @param maxMs Maximum delay in milliseconds (default: 500)
 * @returns Promise that resolves after a random delay between minMs and maxMs
 */
export function delay(minMs: number = 200, maxMs: number = 500): Promise<void> {
  const delayMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

