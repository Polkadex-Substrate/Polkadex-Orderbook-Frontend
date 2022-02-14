import { Story, Meta } from "@storybook/react";

import { PlaceOrder as PlaceOrderComponent } from "./";

export default {
  title: "Organisms/Place Order",
  component: PlaceOrderComponent,
} as Meta<typeof PlaceOrderComponent>;

const Template: Story = (args) => <PlaceOrderComponent {...args} />;

export const PlaceOrder = Template.bind({});
