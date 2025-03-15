interface RetryConfig {
  maxAttempts?: number;
  delayMs?: number;
  backoffFactor?: number;
}

const defaultConfig: Required<RetryConfig> = {
  maxAttempts: 5,
  delayMs: 1000,
  backoffFactor: 2,
};

export const retry = async <T>(fn: () => Promise<T>, config: RetryConfig = {}): Promise<T> => {
  const { maxAttempts, delayMs, backoffFactor } = { ...defaultConfig, ...config };
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxAttempts) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, delayMs * Math.pow(backoffFactor, attempt - 1)));
    }
  }

  throw lastError!;
};
