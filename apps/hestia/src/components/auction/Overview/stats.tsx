import { Icon, Typography } from "@polkadex/ux";
import { RiAuctionLine } from "@remixicon/react";

export const Stats = () => {
  return (
    <div className="flex flex-col gap-8 px-4 py-8 border-b border-primary bg-auctionTexture bg-right-bottom bg-no-repeat bg-[length:500px]">
      <div className="flex flex-col gap-2">
        <Typography.Heading size="5xl">78,295.25 PDEX</Typography.Heading>
        <div className="flex items-center gap-2">
          <Typography.Text appearance="primary">
            Estimated total value
          </Typography.Text>
          <Typography.Text>≈ $ 24,000.00</Typography.Text>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="flex items-center gap-3">
          <Icon appearance="level-2" rounded className="p-3" size="lg">
            <RiAuctionLine className="text-primary" />
          </Icon>
          <div className="flex flex-col">
            <Typography.Text bold size="xl" appearance="primary-base">
              7540 PDEX
            </Typography.Text>
            <Typography.Text appearance="primary">Highest Bid</Typography.Text>
          </div>
        </div>
        <div className="flex flex-col">
          <Typography.Text bold size="xl">
            22
          </Typography.Text>
          <Typography.Text appearance="primary">Participants</Typography.Text>
        </div>
      </div>
    </div>
  );
};
