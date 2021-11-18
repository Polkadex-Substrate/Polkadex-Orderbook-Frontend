import { FilterPriceCustomStep, MarketFilterCustomStep } from "./filterPriceCustomStep";
import {
  FilterPriceSignificantDigit,
  MarketFilterSignificantDigit,
} from "./filterPriceSignificantDigit";

export type PriceValidation = {
  valid: boolean;
  priceStep: number;
};

export type FilterPrice = {
  validatePriceStep(price: number): PriceValidation;
};

export const buildFilterPrice = (filter: MarketFilterSignificantDigit): FilterPrice => {
  switch (filter.type) {
    case "significant_digits":
      return new FilterPriceSignificantDigit(filter as MarketFilterSignificantDigit);
    case "custom_price_steps":
      return new FilterPriceCustomStep(filter as unknown as MarketFilterCustomStep);
    default:
      throw new Error(`Unknown filter ${filter.type}`);
  }
};

export const validatePriceStep = (
  price: string | number = 0,
  filters: FilterPrice[]
): PriceValidation => {
  if (filters && filters.length) {
    return filters.reduce(
      (result, filter) => {
        const currentValidation = filter.validatePriceStep(+price);

        if (!currentValidation.valid) {
          result.valid = false;
          if (currentValidation.priceStep > result.priceStep) {
            result.priceStep = currentValidation.priceStep;
          }
        }

        return result;
      },
      { valid: true, priceStep: 0 } as PriceValidation
    );
  }

  return { valid: true, priceStep: 0 } as PriceValidation;
};
