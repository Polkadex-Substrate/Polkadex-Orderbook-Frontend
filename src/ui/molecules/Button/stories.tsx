import type { Meta, StoryObj } from "@storybook/react";

import { Button } from ".";

export default {
  title: "Molecules/Button",
  component: Button,
  tags: ["autodocs"],
} as Meta<typeof Button>;

export const Default: StoryObj<typeof Button> = {
  args: {
    children: "test",
  },
};
