type OrderBookDerived = {
  ask: string[][];
  bid: string[][];
};
// TODO: add test cases to these funtions
export const deleteFromBook = (
  book: OrderBookDerived,
  price: string,
  side: string
): OrderBookDerived => {
  const bookSide: string[][] = book[side];
  const index = bookSide.findIndex((item) => item[0] === price);
  if (index === -1) return book;
  bookSide.splice(index, 1);
  return { ...book, [side]: bookSide };
};

// TODO: add test cases to these funtions
export const replaceOrAddToBook = (
  book: OrderBookDerived,
  price: string,
  qty: string,
  side: string
): OrderBookDerived => {
  const bookSide: string[][] = book[side];
  const index = bookSide.findIndex((item) => item[0] === price);
  if (index === -1) {
    bookSide.push([price, qty]);
    return { ...book, [side]: bookSide };
  }
  bookSide[index][1] = qty;
  return { ...book, [side]: bookSide };
};
