import { Typography } from "@polkadex/ux";
import { PropsWithChildren } from "react";

export const Overview = () => {
  return (
    <div className="min-w-[450px] p-4 border-r border-primary">
      <div className="pt-20 pb-5 border-b border-primary">
        <div className="flex flex-col items-center gap-2">
          <Typography.Text size="xs" appearance="primary">
            Total Amount Burnt
          </Typography.Text>
          <div className="flex flex-col items-center">
            <Typography.Text bold size="4xl">
              1,401,904
            </Typography.Text>
            <Typography.Text bold size="xl">
              PDEX
            </Typography.Text>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-4 py-6">
        <Card label="Circulating supply">8,360,000 PDEX</Card>
        <Card label="Max. supply">20,000,000 PDEX</Card>
        <Card label="Staked">6,773,243 PDEX</Card>
      </div>
    </div>
  );
};

const Card = ({ label, children }: PropsWithChildren<{ label: string }>) => (
  <div className="flex flex-col">
    <Typography.Text appearance="primary">{label}</Typography.Text>
    <Typography.Text size="2xl" bold>
      {children}
    </Typography.Text>
  </div>
);
