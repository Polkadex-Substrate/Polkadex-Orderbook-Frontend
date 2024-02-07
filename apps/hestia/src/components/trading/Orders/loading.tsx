import { Skeleton } from "@polkadex/ux";

export const Loading = () => {
  return (
    <div className="flex-1 flex flex-col gap-3 p-3 bg-level-3">
      {new Array(8).fill("").map((_, i) => (
        <Skeleton key={i} loading className="flex-1 w-full h-5" />
      ))}
    </div>
  );
};
