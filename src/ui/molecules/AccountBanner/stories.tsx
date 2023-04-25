import type { Meta, StoryObj } from "@storybook/react";

import { AccountBanner } from ".";

export default {
  title: "Molecules/AccountBanner",
  component: AccountBanner,
  tags: ["autodocs"],
} as Meta<typeof AccountBanner>;

export const Default: StoryObj<typeof AccountBanner> = {
  args: {
    onClose: "test",
    title: "Welcome back!",
  },
};
