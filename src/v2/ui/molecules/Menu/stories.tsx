import { Story, Meta } from "@storybook/react";

import { Menu as MenuComponent } from "./";

export default {
  title: "Molecules/Menu",
  component: MenuComponent,
} as Meta<typeof MenuComponent>;

const Template: Story = (args) => <MenuComponent {...args} />;

export const Menu = Template.bind({});
