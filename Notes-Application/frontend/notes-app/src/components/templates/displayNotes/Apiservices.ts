import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.headers.common.Accept = "application/json";
axios.defaults.timeout = 12000;

const getHttpHeaders = (headers: any = {}): AxiosRequestConfig => {
  // Add your custom logic here, for example add a Token to the Headers
  return {
    headers: {
      ...headers,
    },
  };
};

const GET = (
  path: string,
  headers: any = {},
  signal?: AbortSignal
): Promise<AxiosResponse> =>
  axios.get(path, { ...getHttpHeaders(headers), signal });

const DELETE = (
  path: string,
  headers: any = {},
  signal?: AbortSignal
): Promise<AxiosResponse> =>
  axios.delete(path, { ...getHttpHeaders(headers), signal });

const POST = (
  path: string,
  data: any,
  headers: any = {},
  signal?: AbortSignal
): Promise<AxiosResponse> =>
  axios.post(path, data, { ...getHttpHeaders(headers), signal });

const PUT = (
  path: string,
  data: any,
  headers: any = {},
  signal?: AbortSignal
): Promise<AxiosResponse> =>
  axios.put(path, data, { ...getHttpHeaders(headers), signal });

const PATCH = (
  path: string,
  data: any,
  headers: any = {},
  signal?: AbortSignal
): Promise<AxiosResponse> =>
  axios.patch(path, data, { ...getHttpHeaders(headers), signal });

export const APISERVICE = { GET, DELETE, POST, PUT, PATCH };
