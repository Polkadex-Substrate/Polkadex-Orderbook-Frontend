import { defaultConfig } from "@/config";

export const isDisabledFeature = (value: string) =>
  defaultConfig.disabledFeatures.includes(value);
