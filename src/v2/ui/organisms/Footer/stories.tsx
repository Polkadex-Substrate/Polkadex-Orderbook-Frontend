import { Story, Meta } from "@storybook/react";

import { Footer as FooterComponent } from ".";

export default {
  title: "Organisms/Footer",
  component: FooterComponent,
} as Meta<typeof FooterComponent>;

const Template: Story = (args) => <FooterComponent {...args} />;

export const Footer = Template.bind({});
