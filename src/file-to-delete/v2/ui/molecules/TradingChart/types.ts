export type TradingApiResponse = {
    Fine: Array<{
        time: string;
        open: number;
        close: number;
        high: number;
        low: number;
        volume: number;
    }>
}