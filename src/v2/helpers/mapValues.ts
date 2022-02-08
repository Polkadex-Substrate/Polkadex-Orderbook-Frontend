export const mapValues = (maxVolume?: number, data?: number[]) =>
  data && maxVolume && !!data.length
    ? data.map((currentVolume) => {
        return { value: (currentVolume / maxVolume) * 100 };
      })
    : [];
