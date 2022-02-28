export type Props = {
  isOpenOrder?: boolean;
  isSell: boolean;
  filledQuantity?: number;
  orderSide: string;
  baseUnit: string;
  quoteUnit: string;
  data: string[] | number[];
};
