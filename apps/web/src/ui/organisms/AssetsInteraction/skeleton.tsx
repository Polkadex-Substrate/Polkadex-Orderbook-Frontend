import { SkeletonComponent } from "./styles";

import { Skeleton } from "@/ui/molecules";

export const AssetsTableSkeleton = () => (
  <SkeletonComponent>
    <Skeleton height="5rem" width="100%" />
    <Skeleton height="5rem" width="100%" />
    <Skeleton height="5rem" width="100%" />
  </SkeletonComponent>
);
