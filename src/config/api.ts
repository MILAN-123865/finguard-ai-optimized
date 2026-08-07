import axios, {
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL ||
  "/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

const responseCache = new Map<
  string,
  {
    data: any;
    timestamp: number;
  }
>();

const inFlightRequests = new Map<
  string,
  Promise<AxiosResponse<any>>
>();

function getRequestKey(
  config: AxiosRequestConfig
) {
  const method =
    (config.method || "get").toLowerCase();

  const url = config.url || "";

  const params = JSON.stringify(
    config.params || {}
  );

  const token =
    localStorage.getItem("token") ||
    localStorage.getItem(
      "finguard_jwt_token"
    ) ||
    localStorage.getItem(
      "finguard_token"
    ) ||
    "anon";

  return `${token}:${method}:${url}:${params}`;
}

apiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem(
        "finguard_jwt_token"
      ) ||
      localStorage.getItem(
        "finguard_token"
      );

    if (token && config.headers) {
      if (typeof config.headers.set === 'function') {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        (config.headers as any)['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },

  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    if (
      response.config.method?.toLowerCase() ===
      "get"
    ) {
      responseCache.set(
        getRequestKey(response.config),
        {
          data: response.data,
          timestamp: Date.now(),
        }
      );
    }

    return response;
  },

  async (error) => {
    const config =
      error.config as AxiosRequestConfig & {
        _retryCount?: number;
      };

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem(
        "finguard_jwt_token"
      );
      localStorage.removeItem(
        "finguard_token"
      );

      return Promise.reject(error);
    }

    if (
      error.response?.status === 429 &&
      config
    ) {
      config._retryCount =
        config._retryCount || 0;

      if (config._retryCount < 3) {
        config._retryCount++;

        const delay =
          Math.pow(
            2,
            config._retryCount
          ) *
            1000 +
          Math.random() * 500;

        await new Promise((resolve) =>
          setTimeout(resolve, delay)
        );

        return apiClient(config);
      }
    }

    if (
      !error.response &&
      config?.method?.toLowerCase() ===
        "get"
    ) {
      const cached =
        responseCache.get(
          getRequestKey(config)
        );

      if (cached) {
        return Promise.resolve({
          data: cached.data,
          status: 200,
          statusText: "OK",
          headers: {},
          config,
        });
      }
    }

    return Promise.reject(error);
  }
);

export async function dedupedGet<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  const req = {
    ...config,
    method: "get",
    url,
  };

  const key = getRequestKey(req);

  if (inFlightRequests.has(key)) {
    return inFlightRequests.get(
      key
    ) as Promise<AxiosResponse<T>>;
  }

  const promise = apiClient
    .get<T>(url, config)
    .finally(() => {
      inFlightRequests.delete(key);
    });

  inFlightRequests.set(key, promise);

  return promise;
}