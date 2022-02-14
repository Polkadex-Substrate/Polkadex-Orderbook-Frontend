import { Story, Meta } from "@storybook/react";

import { colors, sizes } from "../../../helpers";
import { TemplateContainer } from "../../atoms";

import * as T from "./types";

import { Badge as BadgeComponent } from "./";

export default {
  title: "Molecules/Badge",
  component: BadgeComponent,
  argTypes: {
    size: {
      options: sizes,
      control: { type: "inline-radio" },
    },
    background: {
      options: colors,
      control: { type: "inline-radio" },
    },
  },
  args: {
    children: "Example",
    withIcon: false,
    size: "small",
  },
} as Meta<typeof BadgeComponent>;

const Template: Story<T.Props> = (args) => (
  <TemplateContainer>
    <BadgeComponent {...args} />
  </TemplateContainer>
);

export const Badge = Template.bind({});
