import { Story, Meta } from "@storybook/react";

import { MyAccount as MyAccountComponent } from "./";

export default {
  title: "Molecules/My Account",
  component: MyAccountComponent,
} as Meta<typeof MyAccountComponent>;

const Template: Story = (args) => <MyAccountComponent {...args} />;

export const MyAccount = Template.bind({});
