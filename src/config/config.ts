import { ApiWrapper, JsonBody, RequestOptions } from "./types";
import { makeRequest } from "./requestBuilder";

export const API: ApiWrapper = {
  get: (config: RequestOptions) => async (url: string) =>
    makeRequest(
      {
        method: "get",
        url,
      },
      config
    ),

  post: (config: RequestOptions) => async (url: string, body?: JsonBody) =>
    makeRequest(
      {
        method: "post",
        body,
        url,
      },
      config
    ),

  patch: (config: RequestOptions) => async (url: string, body?: JsonBody) =>
    makeRequest(
      {
        method: "patch",
        body,
        url,
      },
      config
    ),

  put: (config: RequestOptions) => async (url: string, body?: JsonBody) =>
    makeRequest(
      {
        method: "put",
        body,
        url,
      },
      config
    ),

  delete: (config: RequestOptions) => async (url: string) =>
    makeRequest(
      {
        method: "delete",
        url,
      },
      config
    ),
};
