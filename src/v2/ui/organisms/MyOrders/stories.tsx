import { Story, Meta } from "@storybook/react";

import { MyOrders as MyOrdersComponent } from "./";

export default {
  title: "Organisms/My Orders",
  component: MyOrdersComponent,
} as Meta<typeof MyOrdersComponent>;

const Template: Story = (args) => <MyOrdersComponent {...args} />;

export const MyOrders = Template.bind({});
