import { Story, Meta } from "@storybook/react";

import { Header as HeaderComponent } from "./";

export default {
  title: "Organisms/Header",
  component: HeaderComponent,
} as Meta<typeof HeaderComponent>;

const Template: Story = (args) => <HeaderComponent {...args} />;

export const Header = Template.bind({});
