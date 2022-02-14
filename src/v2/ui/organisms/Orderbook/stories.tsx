import { Story, Meta } from "@storybook/react";

import { Orderbook as OrderbookComponent } from "./";

export default {
  title: "Organisms/Orderbook",
  component: OrderbookComponent,
} as Meta<typeof OrderbookComponent>;

const Template: Story = (args) => <OrderbookComponent {...args} />;

export const Orderbook = Template.bind({});
