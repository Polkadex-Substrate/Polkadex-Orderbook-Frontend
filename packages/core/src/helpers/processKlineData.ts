import { KlineDbData } from "@/providers/public/klineProvider";

// This function aims to provide a timestamp that represents the same point in time as the input ISO date string
// but without accounting for any time zone offset.
// This is useful for us because we want to work with timestamps that should be consistent across different time zones.
export const getCorrectTimestamp = (ISOdate: string) => {
  const date = new Date(ISOdate);

  const timestampWithOffset = date.getTime();

  const offset = date.getTimezoneOffset() * 60 * 1000;
  const timestampWithoutOffset = timestampWithOffset - offset;
  return timestampWithoutOffset;
};

export const processKlineData = (data: KlineDbData[]) => {
  const klinesData = data.map((x) => ({
    timestamp: getCorrectTimestamp(x.t),
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
