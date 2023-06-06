import { KlineDbData } from "../providers/public/klineProvider";

export const processKlineData = (data: KlineDbData[]) => {
  const klinesData = data.map((x) => ({
    timestamp: new Date(x.t).getTime(),
    open: Number(x.o),
    high: Number(x.h),
    low: Number(x.l),
    close: Number(x.c),
    volume: Number(x.vb),
  }));
  // if volume is 0, take previous close as candle
  klinesData?.forEach((elem, idx) => {
    if (idx === 0) {
      return;
    }
    if (!elem.volume) {
      elem.low = klinesData[idx - 1].close;
      elem.high = klinesData[idx - 1].close;
      elem.close = klinesData[idx - 1].close;
      elem.open = klinesData[idx - 1].close;
      elem.volume = 0;
    }
  });
  return klinesData;
};
