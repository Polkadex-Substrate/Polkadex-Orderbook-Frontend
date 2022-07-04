import { KlineEvent } from "../modules/public/kline";

export const fillKlineMissingData = (klines: KlineEvent[], interval: number): KlineEvent[] => {
  const inc = Number(interval);
  const filledKlines = [];
  for (let i = 0; i < klines.length; i++) {
    if (i === 0) {
      filledKlines.push(klines[i]);
      continue;
    }
    const kline = klines[i];
    const prevKline = klines[i - 1];
    if (prevKline) {
      const prevTimestamp = prevKline.timestamp;
      const timestamp = kline.timestamp;
      const diff = timestamp - prevTimestamp;
      if (diff > inc) {
        const missingKlines = Math.floor(diff / inc);
        for (let j = 0; j < missingKlines; j++) {
          const missingKline = {
            open: prevKline.close,
            high: prevKline.close,
            low: prevKline.close,
            close: prevKline.close,
            volume: 0,
            timestamp: prevTimestamp + (j + 1) * inc,
          };
          filledKlines.push(missingKline);
        }
      }
    }
    filledKlines.push(kline);
  }
  return filledKlines;
};
