export interface HistoryFetchPayload {
  currency?: string;
  page: number;
  type: string;
  limit?: number;
  market?: string;
  time_from?: string;
  time_to?: string;
}
export const getHistorySagaParam = (action: HistoryFetchPayload) =>
  Object.entries(action)
    .filter((w) => w[1] !== undefined && w[0] !== "type")
    .map((k) => {
      const param = k[0] === "page" ? Number(k[1]) + 1 : k[1];

      return `${k[0]}=${encodeURIComponent(param)}`;
    })
    .join("&");
