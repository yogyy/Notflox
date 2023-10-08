import { BASE_URL } from '@/utils/request';
import axios, { AxiosRequestConfig } from 'axios';
import type { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { MovieResponse } from '~/typing';

export default async function fetcher<T>(
  endpoint: string,
  options?: AxiosRequestConfig
): Promise<T> {
  const response = await axios.get(endpoint, {
    ...options,
    method: 'GET',
    headers: {
      ...options?.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
    },
  });

  return await response.data;
}
