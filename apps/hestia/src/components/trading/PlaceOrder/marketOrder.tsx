"use client";

import { Button, Input } from "@polkadex/ux";

import { Balance } from "./balance";

import { Range } from "@/components/ui/Temp/range";

export const MarketOrder = () => {
  return (
    <div className="flex flex-auto gap-2 flex-wrap">
      <BuyOrder />
      <SellOrder />
    </div>
  );
};

const BuyOrder = () => {
  return (
    <form className="flex flex-auto flex-col gap-2">
      <Button.Solid
        appearance="secondary"
        className="pointer-events-none opacity-50 border border-dashed"
        size="md"
      >
        Best Market Price
      </Button.Solid>
      <Input.Primary type="text" placeholder="0.0000000000">
        <Input.Label className="w-[50px]">Amount</Input.Label>
        <Input.Ticker>DOT</Input.Ticker>
        <Input.Button
          variant="decrease"
          onClick={() => window.alert("Decrease")}
        />
        <Input.Button
          variant="increase"
          onClick={() => window.alert("Increase")}
        />
      </Input.Primary>
      <Balance baseTicker="PDEX">16.024059595</Balance>
      <div className="my-2">
        <Range
          ranges={[
            { value: "25%", action: () => window.alert("25%") },
            { value: "50%", action: () => window.alert("50%") },
            { value: "75%", action: () => window.alert("75%") },
            { value: "100%", action: () => window.alert("100%") },
          ]}
        />
      </div>
      <Button.Solid appearance="success" type="submit">
        Buy DOT
      </Button.Solid>
    </form>
  );
};

const SellOrder = () => {
  return (
    <form className="flex flex-auto flex-col gap-2">
      <Button.Solid
        appearance="secondary"
        className="pointer-events-none opacity-50 border border-dashed"
        size="md"
      >
        Best Market Price
      </Button.Solid>
      <Input.Primary type="text" placeholder="0.0000000000">
        <Input.Label className="w-[50px]">Amount</Input.Label>
        <Input.Ticker>DOT</Input.Ticker>
        <Input.Button
          variant="decrease"
          onClick={() => window.alert("Decrease")}
        />
        <Input.Button
          variant="increase"
          onClick={() => window.alert("Increase")}
        />
      </Input.Primary>
      <Balance baseTicker="DOT">0.00456000</Balance>
      <div className="my-2">
        <Range
          ranges={[
            { value: "25%", action: () => window.alert("25%") },
            { value: "50%", action: () => window.alert("50%") },
            { value: "75%", action: () => window.alert("75%") },
            { value: "100%", action: () => window.alert("100%") },
          ]}
        />
      </div>
      <Button.Solid type="submit">Sell PDEX</Button.Solid>
    </form>
  );
};
