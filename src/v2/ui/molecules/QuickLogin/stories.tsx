import { Story, Meta } from "@storybook/react";

import { QuickLogin as QuickLoginComponent } from ".";

export default {
  title: "Molecules/Quick Login",
  component: QuickLoginComponent,
} as Meta<typeof QuickLoginComponent>;

const Template: Story = (args) => <QuickLoginComponent {...args} />;

export const QuickLogin = Template.bind({});
