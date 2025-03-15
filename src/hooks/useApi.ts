import { useState, useCallback } from 'react';

interface UseApiConfig<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseApiResult<T, P> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  execute: (params?: P) => Promise<void>;
}

export const useApi = <T, P = void>(
  apiFunction: (params?: P) => Promise<T>,
  config: UseApiConfig<T> = {}
): UseApiResult<T, P> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (params?: P) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await apiFunction(params);
        setData(result);
        config.onSuccess?.(result);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An error occurred');
        setError(error);
        config.onError?.(error);
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction, config]
  );

  return {
    data,
    error,
    isLoading,
    execute,
  };
};
