import { useState, useCallback, useRef } from "react";

interface FetchState<T, E = unknown> {
  data: T | null;
  error: E | null;
  isLoading: boolean;
  isSuccess: boolean;
}

type FetchOptions = RequestInit & {
  token?: string;
};

export function useFetch<T, E = unknown>(
  initialUrl?: string,
  initialOptions?: FetchOptions
) {
  const [state, setState] = useState<FetchState<T, E>>({
    data: null,
    error: null,
    isLoading: false,
    isSuccess: false,
  });

  const activeRequestRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async (url: string, options?: FetchOptions) => {
    // Cancel any ongoing request
    if (activeRequestRef.current) {
      activeRequestRef.current.abort();
    }

    const abortController = new AbortController();
    activeRequestRef.current = abortController;

    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const headers = new Headers(options?.headers);
      if (options?.token) {
        headers.set("Authorization", `Bearer ${options.token}`);
      }

      const response = await fetch(url, {
        ...options,
        headers,
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      setState({ data, error: null, isLoading: false, isSuccess: true });
      return { data, response };
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      setState({
        data: null,
        error: error as E,
        isLoading: false,
        isSuccess: false,
      });
      throw error;
    } finally {
      activeRequestRef.current = null;
    }
  }, []);

  const execute = useCallback(
    (url: string = initialUrl || "", options?: FetchOptions) => {
      return fetchData(url, options);
    },
    [fetchData, initialUrl]
  );

  return {
    ...state,
    isError: !!state.error,
    execute,
  };
}
