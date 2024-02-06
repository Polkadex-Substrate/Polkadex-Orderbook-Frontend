"use client";

import { Info } from "./info";
import { HowItWorks } from "./howItWorks";

export const Hero = () => {
  return (
    <div className="flex flex-col justify-center bg-level-0 border-y border-primary">
      <div className="flex flex-col max-w-[1000px] mx-auto border-x border-primary">
        <Info />
        <HowItWorks />
      </div>
    </div>
  );
};
