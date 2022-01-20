import { Story, Meta } from "@storybook/react";

import { QrLogin as QrLoginComponent } from ".";

export default {
  title: "Molecules/Quick Login",
  component: QrLoginComponent,
} as Meta<typeof QrLoginComponent>;

const Template: Story = (args) => <QrLoginComponent {...args} />;

export const QuickLogin = Template.bind({});
