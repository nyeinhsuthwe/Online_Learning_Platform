import { useQuery } from "@tanstack/react-query";
import axios from "../helper/axios";

interface QueryPayload {
  endpoint: string;
  method?: "GET" | "POST"; 
  queryKey?: unknown[];
  params?: Record<string, any>;
  enabled?: boolean
}

export function useApiQuery<TData = any>(
  { endpoint, method = "GET", queryKey, params, enabled = true }: QueryPayload,
  options?: any
) {
  return useQuery<TData>({
    queryKey: queryKey ?? [endpoint, params],
    enabled,
    queryFn: async () => {
      if (method === "POST") {
        const res = await axios.post(endpoint, params);
        return res.data;
      }

      const res = await axios.get(endpoint, { params });
      return res.data;
    },
    ...options,
  });
}
