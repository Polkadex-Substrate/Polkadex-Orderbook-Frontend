import { BigNumber } from "bignumber.js";
BigNumber.config({ DECIMAL_PLACES: 8 });

// use this instance of BigNumber for all calculations, so export from here
export type BigNum = typeof BigNumber;
export const Big = BigNumber;