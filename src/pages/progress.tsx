import dynamic from "next/dynamic";

import { useDisabledPages } from "../hooks/useDisabledPages";

const ProgressTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates/Progress").then((mod) => mod.Progress),
  {
    ssr: false,
  }
);

const Progress = () => {
  const { disabled } = useDisabledPages();
  if (disabled) return <div />;

  return <ProgressTemplate />;
};

export default Progress;
