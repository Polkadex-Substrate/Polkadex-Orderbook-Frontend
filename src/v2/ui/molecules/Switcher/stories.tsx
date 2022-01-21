import { Story, Meta } from "@storybook/react";

import { Switcher as SwitcherComponent } from ".";

export default {
  title: "Molecules/Switcher",
  component: SwitcherComponent,
} as Meta<typeof SwitcherComponent>;

const Template: Story = (args) => <SwitcherComponent {...args} />;

export const Switcher = Template.bind({});
