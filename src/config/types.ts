import { AxiosResponse } from "axios";

export type HTTPMethod = "get" | "post" | "delete" | "put" | "patch";

export type JsonBody = {
  // tslint:disable-next-line no-any
  [key: string]: any;
};

export type RequestOptions = {
  apiVersion: "auth" | "engine" | "polkadexHostUrl";
  withHeaders?: boolean;
  headers?: Record<string, unknown>;
};

export type Request = {
  method: HTTPMethod;
  url: string;
  body?: JsonBody;
};

export type RequestBody = JsonBody | FormData;

export type RequestMethod = (
  config: RequestOptions
) => (url: string, body?: RequestBody) => Promise<AxiosResponse["data"] | unknown>;

export type ApiWrapper = {
  get: RequestMethod;
  post: RequestMethod;
  patch?: RequestMethod;
  put?: RequestMethod;
  delete?: RequestMethod;
};

export type DefaultConfig = {
  polkadotJsWs: string;
  auth: string;
  engine: string;
  polkadexHostUrl: string;
  gaTrackerKey: string;
  withCredentials: boolean;
  incrementalOrderBook: boolean;
  orderBookSideLimit: number;
  defaultStorageLimit: number;
  defaultTradingViewInterval: number;
  sessionCheckInterval: number;
  balancesFetchInterval: number;
  minutesUntilAutoLogout: number;
  alertDisplayTime: number;
  msPricesUpdates: number;
  maintenanceMode: boolean;
};
