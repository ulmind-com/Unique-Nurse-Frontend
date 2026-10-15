export const API_BASE = "/api/public/proxy";

export type Envelope<T> = {
  success: boolean;
  message?: string;
  data: T;
  errors?: unknown;
};

export type Paginated<T> = {
  items: T[];
  pagination?: {
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
};

export class ApiError extends Error {
  status: number;
  payload?: unknown;
  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

type FetchOpts = {
  method?: string;
  body?: unknown;
  formData?: FormData;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  query?: Record<string, string | number | boolean | undefined | null>;
};

/**
 * During SSR there is no origin to hang the relative `/api/public/proxy` path
 * off, so hit the upstream API directly instead of looping back through our own
 * server. In the browser we keep going through the proxy (same-origin, no CORS).
 */
const SSR_UPSTREAM =
  import.meta.env.VITE_API_UPSTREAM ?? "https://unique-nurse-aya-api.onrender.com/api/v1";

function buildUrl(path: string) {
  if (typeof window === "undefined") return new URL(`${SSR_UPSTREAM}${path}`);
  return new URL(`${API_BASE}${path}`, window.location.origin);
}

export async function apiFetch<T>(path: string, opts: FetchOpts = {}): Promise<T> {
  const url = buildUrl(path);
  if (opts.query) {
    for (const [k, v] of Object.entries(opts.query)) {
      if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
    }
  }

  const init: RequestInit = {
    method: opts.method ?? "GET",
    headers: { Accept: "application/json", ...(opts.headers ?? {}) },
    signal: opts.signal,
  };

  if (opts.formData) {
    init.body = opts.formData;
  } else if (opts.body !== undefined) {
    (init.headers as Record<string, string>)["Content-Type"] = "application/json";
    init.body = JSON.stringify(opts.body);
  }

  const res = await fetch(url.toString(), init);
  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    /* non-JSON */
  }

  if (!res.ok) {
    const msg =
      (json as { message?: string; detail?: string } | null)?.message ??
      (json as { detail?: string } | null)?.detail ??
      `Request failed (${res.status})`;
    throw new ApiError(msg, res.status, json);
  }

  const env = json as Envelope<T> | T;
  if (env && typeof env === "object" && "data" in (env as object) && "success" in (env as object)) {
    return (env as Envelope<T>).data;
  }
  return env as T;
}

export const api = {
  get: <T>(path: string, query?: FetchOpts["query"], signal?: AbortSignal) =>
    apiFetch<T>(path, { query, signal }),
  post: <T>(path: string, body?: unknown, signal?: AbortSignal) =>
    apiFetch<T>(path, { method: "POST", body, signal }),
  postForm: <T>(path: string, formData: FormData, signal?: AbortSignal) =>
    apiFetch<T>(path, { method: "POST", formData, signal }),
};
