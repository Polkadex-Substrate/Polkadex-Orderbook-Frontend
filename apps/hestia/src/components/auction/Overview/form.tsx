import {
  Button,
  HoverInformation,
  Input,
  ResponsiveCard,
  Typography,
} from "@polkadex/ux";
import { RiInformationFill } from "@remixicon/react";

export const Form = () => {
  return (
    <div className="flex-1 2xl:px-32 px-20">
      <div className="bg-level-0 border border-primary min-w-[400px] mx-auto -mt-20">
        <div className="flex flex-col items-center gap-4 bg-level-1 p-6 border-b border-primary">
          <Typography.Text appearance="primary">
            Auction ends on June 21st, 3:00 PM UTC
          </Typography.Text>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-1">
              <Typography.Text size="2xl" bold>
                2
              </Typography.Text>
              <Typography.Text appearance="primary">Days</Typography.Text>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Typography.Text size="2xl" bold>
                0
              </Typography.Text>
              <Typography.Text appearance="primary">Hours</Typography.Text>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Typography.Text size="2xl" bold>
                12
              </Typography.Text>
              <Typography.Text appearance="primary">Minutes</Typography.Text>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Typography.Text size="2xl" bold>
                32
              </Typography.Text>
              <Typography.Text appearance="primary">Seconds</Typography.Text>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 p-6">
          <div className="flex flex-col gap-2">
            <Typography.Heading size="2xl">Participate</Typography.Heading>
            <Typography.Paragraph size="sm" appearance="primary">
              The highest bidder wins the entire asset basket at expiry, and the
              winning PDEX bid is burned, reducing the token supply.
            </Typography.Paragraph>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <Typography.Text appearance="primary">My bid</Typography.Text>
              <HoverInformation>
                <HoverInformation.Trigger className="min-w-20">
                  <RiInformationFill className="w-3 h-3 text-actionInput" />
                  <Typography.Text appearance="primary">
                    Available: 0 PDEX
                  </Typography.Text>
                </HoverInformation.Trigger>
                <HoverInformation.Content>
                  <ResponsiveCard label="Source fee">0 PDEX</ResponsiveCard>
                  <ResponsiveCard label="Destination fee">
                    0 PDEX
                  </ResponsiveCard>
                  <ResponsiveCard label="Available">0 PDEX</ResponsiveCard>
                </HoverInformation.Content>
              </HoverInformation>
            </div>
            <div className="border border-primary">
              <Input.Vertical
                type="text"
                autoComplete="off"
                placeholder="Enter an amount"
                className="max-sm:focus:text-[16px] w-full p-4"
              >
                <Input.Action
                  type="button"
                  onClick={(e) => e.preventDefault()}
                  className="mr-4"
                >
                  MAX
                </Input.Action>
              </Input.Vertical>
            </div>
          </div>
          <Button.Solid appearance="tertiary">Place a bid</Button.Solid>
        </div>
      </div>
    </div>
  );
};
