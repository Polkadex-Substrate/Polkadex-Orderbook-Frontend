export const calcAveragePrice = (filledQty: string, filledPrice: string) => {
  const qty = Number(filledQty);
  const totalPrice = Number(filledPrice);
  return qty > 0 ? totalPrice / qty : 0;
};
