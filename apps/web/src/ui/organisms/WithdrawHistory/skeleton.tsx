import { SkeletonComponent } from "./styles";

import { normalizeValue } from "@/utils/normalize";
import { Skeleton } from "@/ui/molecules";

export const WithdrawHistorySkeleton = () => (
  <SkeletonComponent>
    <Skeleton height={normalizeValue(5)} width="100%" />
    <Skeleton height={normalizeValue(5)} width="100%" />
    <Skeleton height={normalizeValue(5)} width="100%" />
  </SkeletonComponent>
);
