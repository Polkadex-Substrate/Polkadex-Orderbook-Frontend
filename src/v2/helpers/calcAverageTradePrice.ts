export const calcAveragePrice = (trades: string) => {
  const tradesArray = trades.split(",").filter((str) => str !== "");
  if (tradesArray.length === 0) return 0;
  const weightedPrice = tradesArray.reduce((acc, trade) => {
    const price = Number(trade.split("-")[0]);
    const qty = Number(trade.split("-")[1]);
    return acc + price * qty;
  }, 0);
  return weightedPrice / tradesArray.length;
};
