import { Story, Meta } from "@storybook/react";

import { RecentTrades as RecentTradesComponent } from "./";

export default {
  title: "Organisms/Recent Trades",
  component: RecentTradesComponent,
} as Meta<typeof RecentTradesComponent>;

const Template: Story = (args) => <RecentTradesComponent {...args} />;

export const RecentTrades = Template.bind({});
