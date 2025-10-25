export type ApiResponse<T> = {
  data: T;
  message?: string;
};

export async function fetcher<T>(endpoint: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const response = await fetch(endpoint, init);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = (await response.json()) as T;

  return { data };
}

export async function mockDelay<T>(value: T, delay = 300): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return value;
}
