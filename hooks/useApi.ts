import { handleApiError } from '@/utils/errorHandler';
import { useCallback, useState } from 'react';

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export function useApi<T, P extends any[]>(
  apiFunction: (...args: P) => Promise<T>
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: P) => {
      try {
        setState({ data: null, isLoading: true, error: null });
        
        const result = await apiFunction(...args);
        
        setState({ data: result, isLoading: false, error: null });
        return result;
      } catch (error) {
        const errorMessage = handleApiError(error);
        setState({ data: null, isLoading: false, error: errorMessage });
        throw error;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}