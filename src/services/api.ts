const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

interface RequestOptions extends Omit<RequestInit, "body"> {
  token?: string;
  body?: unknown;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (options.token) {
    headers["Authorization"] = `Bearer ${options.token}`;
  }

  const body = options.body
    ? typeof options.body === "string"
      ? options.body
      : JSON.stringify(options.body)
    : undefined;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    body
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || error.errors?.join(", ") || response.statusText);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function register(user: { name: string; email: string; password: string; password_confirmation?: string; role?: string }) {
  return request<{ token: string; user: Record<string, unknown> }>("/auth/register", {
    method: "POST",
    body: { user }
  });
}

export function login(credentials: { email: string; password: string }) {
  return request<{ token: string; user: Record<string, unknown> }>("/auth/login", {
    method: "POST",
    body: { user: credentials }
  });
}

export function listProducts() {
  return request<Array<Record<string, unknown>>>("/products", { method: "GET" });
}

export function createProduct(token: string, product: Record<string, unknown>) {
  return request<Record<string, unknown>>("/products", {
    method: "POST",
    token,
    body: { product }
  });
}

export function updateProduct(token: string, productId: number, product: Record<string, unknown>) {
  return request<Record<string, unknown>>(`/products/${productId}`, {
    method: "PUT",
    token,
    body: { product }
  });
}

export function deleteProduct(token: string, productId: number) {
  return request<undefined>(`/products/${productId}`, {
    method: "DELETE",
    token
  });
}

export function listOrders(token: string) {
  return request<Array<Record<string, unknown>>>("/orders", {
    method: "GET",
    token
  });
}

export function createOrder(token: string, order: Record<string, unknown>) {
  return request<Record<string, unknown>>("/orders", {
    method: "POST",
    token,
    body: { order }
  });
}

export function updateOrder(token: string, orderId: number, order: Record<string, unknown>) {
  return request<Record<string, unknown>>(`/orders/${orderId}`, {
    method: "PUT",
    token,
    body: { order }
  });
}

export function createCheckoutSession(token: string, payload: Record<string, unknown>) {
  return request<{ session_id: string }>("/checkout", {
    method: "POST",
    token,
    body: payload
  });
}

export { API_BASE_URL };
