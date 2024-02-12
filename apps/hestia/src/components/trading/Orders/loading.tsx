// TODO: Use SkeletonCollection component
import { Skeleton } from "@polkadex/ux";

export const Loading = () => {
  return (
    <div className="px-2">
      {new Array(5).fill("").map((_, i) => (
        <Skeleton key={i} loading className="h-11 flex-1 my-2" />
      ))}
    </div>
  );
};
