import { MarketCard } from "./marketCard";

export const Markets = () => {
  return (
    <div className="overflow-hidden">
      <div className="inline-flex gap-4 animate-infiniteHorizontalScroll">
        <AllMarkets />
        <AllMarkets />
      </div>
    </div>
  );
};

const AllMarkets = () => (
  <div className="inline-flex gap-4">
    <MarketCard pair="BTC" market="PDEX" change={1.03} price={0.00000435} />
    <MarketCard
      pair="DOT"
      market="PDEX"
      change={5.65}
      price={0.03847381}
      positive
    />
    <MarketCard
      pair="PDEX"
      market="USDT"
      change={12.5}
      price={45.4301838}
      positive
    />
    <MarketCard pair="AAVE" market="USDT" change={0.56} price={3.587356} />
    <MarketCard
      pair="ACALA"
      market="PDEX"
      change={2.57}
      price={2.0485457}
      positive
    />
    <MarketCard
      pair="PSWAP"
      market="PDEX"
      change={0.45}
      price={0.0193875}
      positive
    />
    <MarketCard
      pair="PSWAP"
      market="PDEX"
      change={0.45}
      price={0.0193875}
      positive
    />
  </div>
);
