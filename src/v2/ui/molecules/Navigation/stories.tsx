import { Story, Meta } from "@storybook/react";

import { Switcher } from "../Switcher";

import { Navigation as NavigationComponent } from ".";

export default {
  title: "Molecules/Navigation",
  component: NavigationComponent,
} as Meta<typeof NavigationComponent>;

const Template: Story = (args) => (
  <NavigationComponent {...args}>
    <Switcher
      title="Dark Mode"
      description="Adjust the appearance of Polkadex to reduce  glare and give you eyes a break."
      icon="Appearance"
    />
    <Switcher
      title="Classic Mode"
      description="The layout of the classic version is quite similar to other exchanges."
      icon="Computer"
    />
  </NavigationComponent>
);

export const Navigation = Template.bind({});

Navigation.args = {
  title: "Appearance",
};
