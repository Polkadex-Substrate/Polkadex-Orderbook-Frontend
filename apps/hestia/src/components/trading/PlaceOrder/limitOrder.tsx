"use client";

import { Button, Input } from "@polkadex/ux";
import { useFormik } from "formik";

import { Balance } from "./balance";

import { Range } from "@/components/ui/Temp/range";

export const LimitOrder = () => {
  return (
    <div className="flex flex-auto gap-2 flex-wrap">
      <BuyOrder />
      <SellOrder />
    </div>
  );
};

const BuyOrder = () => {
  const initialValues = {
    price: "",
    amount: "",
  };

  const { getFieldProps, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (e) => {
      console.log("submitted", e);
    },
  });

  return (
    <form className="flex flex-auto flex-col gap-2" onSubmit={handleSubmit}>
      <Input.Primary
        {...getFieldProps("price")}
        type="text"
        placeholder="0.0000000000"
      >
        <Input.Label className="w-[50px]">Price</Input.Label>
        <Input.Ticker>PDEX</Input.Ticker>
        <Input.Button
          variant="decrease"
          onClick={() => window.alert("Decrease")}
        />
        <Input.Button
          variant="increase"
          onClick={() => window.alert("Increase")}
        />
      </Input.Primary>
      <Input.Primary
        {...getFieldProps("amount")}
        type="text"
        placeholder="0.0000000000"
      >
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
      <Range
        ranges={[
          { value: "25%", action: () => window.alert("25%") },
          { value: "50%", action: () => window.alert("50%") },
          { value: "75%", action: () => window.alert("75%") },
          { value: "100%", action: () => window.alert("100%") },
        ]}
      />
      <Input.Primary type="text" placeholder="0.0000000000">
        <Input.Label className="w-[50px]">Total</Input.Label>
        <Input.Ticker>PDEX</Input.Ticker>
        <Input.Button
          variant="decrease"
          onClick={() => window.alert("Decrease")}
        />
        <Input.Button
          variant="increase"
          onClick={() => window.alert("Increase")}
        />
      </Input.Primary>
      <Button.Solid appearance="success" type="submit">
        Buy DOT
      </Button.Solid>
    </form>
  );
};

const SellOrder = () => {
  return (
    <form className="flex flex-auto flex-col gap-2">
      <Input.Primary type="text" placeholder="0.0000000000">
        <Input.Label className="w-[50px]">Price</Input.Label>
        <Input.Ticker>PDEX</Input.Ticker>
        <Input.Button
          variant="decrease"
          onClick={() => window.alert("Decrease")}
        />
        <Input.Button
          variant="increase"
          onClick={() => window.alert("Increase")}
        />
      </Input.Primary>
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
      <Range
        ranges={[
          { value: "25%", action: () => window.alert("25%") },
          { value: "50%", action: () => window.alert("50%") },
          { value: "75%", action: () => window.alert("75%") },
          { value: "100%", action: () => window.alert("100%") },
        ]}
      />
      <Input.Primary type="text" placeholder="0.0000000000">
        <Input.Label className="w-[50px]">Total</Input.Label>
        <Input.Ticker>PDEX</Input.Ticker>
        <Input.Button
          variant="decrease"
          onClick={() => window.alert("Decrease")}
        />
        <Input.Button
          variant="increase"
          onClick={() => window.alert("Increase")}
        />
      </Input.Primary>
      <Button.Solid type="submit">Sell PDEX</Button.Solid>
    </form>
  );
};
