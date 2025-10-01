export const SERVER_URL =
  "https://itwebs-test-task-server-production.up.railway.app";
export const WSS_URL = "ws://itwebs-test-task-server-production.up.railway.app";

export async function apiFetch<TBody, TResponse = unknown>(
  url: string,
  options: {
    method?: "GET" | "POST";
    body?: TBody;
    headers?: HeadersInit;
  }
): Promise<TResponse> {
  const { method = "GET", body, headers } = options;

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) throw new Error(`API fetch failed: ${res.status}`);

    return res.json() as TResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
