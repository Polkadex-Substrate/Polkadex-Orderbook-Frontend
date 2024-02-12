import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Button, Icons, Typography } from "@polkadex/ux";
import Link from "next/link";

import { Rewards } from "@/components/ui/Icons/rewards";

export const Info = () => {
  return (
    <div className="flex items-center gap-2 border-b border-primary">
      <div className="flex flex-col gap-2 px-8 pt-4">
        <Typography.Heading className="text-3xl">
          Liquidity Provider Rewards
        </Typography.Heading>
        <Typography.Paragraph appearance="primary">
          Polkadex Launch Incentives Program features a $1 million liquidity
          fund, with participants earning points through Orderbook usage.
          Rewards are distributed at the end of each epoch based on the
          accumulated points.
        </Typography.Paragraph>
        <Button.Underline asChild className="p-0 gap-2 justify-start text-sm">
          <Link href="/">
            Read more
            <ArrowTopRightOnSquareIcon className="w-3 h-3" />
          </Link>
        </Button.Underline>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <div className="grid place-content-center w-8 h-8 rounded-md bg-level-2 ">
              <Icons.Transfer className="w-4 h-4 text-primary-base" />
            </div>
            <Typography.Text bold>28-day trading</Typography.Text>
          </div>
          <div className="grid place-content-center w-8 h-8 rounded-full bg-level-1 ">
            <Typography.Text size="xl">=</Typography.Text>
          </div>
          <div className="flex items-center gap-2">
            <div className="grid place-content-center w-8 h-8 rounded-md bg-level-2 ">
              <Icons.Transfer className="w-4 h-4 text-primary-base" />
            </div>
            <Typography.Text bold>Points</Typography.Text>
          </div>
          <div className="grid place-content-center w-8 h-8 rounded-full bg-level-1 ">
            <Typography.Text size="xl">=</Typography.Text>
          </div>
          <div className="flex items-center gap-2">
            <div className="grid place-content-center w-8 h-8 rounded-md bg-level-2 ">
              <Icons.Transfer className="w-4 h-4 text-primary-base" />
            </div>
            <Typography.Text bold>Rewards</Typography.Text>
          </div>
        </div>
      </div>
      <Rewards className="min-w-[200px]" />
    </div>
  );
};
