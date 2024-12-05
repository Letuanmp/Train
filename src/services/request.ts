const baseUrl = import.meta.env.VITE_API_URL;

export const request = {
  get: (
    path: string,
    params?: Record<string, string>,
    options?: RequestInit
  ) => {
    const paramFilter = params ? new URLSearchParams(params) : undefined;
    return fetch(
      `${baseUrl}${path}${paramFilter ? `?${paramFilter.toString()}` : ""}`,
      options
    );
  },
  post: (path: string, data?: Record<string, any>, options?: RequestInit) => {
    return fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      ...options,
    });
  },
  put: (path: string, data?: FormData, options?: RequestInit) => {
    return fetch(`${baseUrl}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      ...options,
    });
  },
  delete: (
    path: string,
    params?: Record<string, string>,
    options?: RequestInit
  ) => {
    const paramFilter = params ? new URLSearchParams(params) : undefined;
    return fetch(
      `${baseUrl}${path}${paramFilter ? `?${paramFilter.toString()}` : ""}`,
      {
        method: "DELETE",
        ...options,
      }
    );
  },
};
