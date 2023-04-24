import type { Meta, StoryObj } from "@storybook/react";

import { AccountOverview } from ".";

export default {
  title: "Molecules/AccountOverview",
  component: AccountOverview,
  tags: ["autodocs"],
} as Meta<typeof AccountOverview>;

export const Default: StoryObj<typeof AccountOverview> = {
  args: {
    onNavigate:()=>{},
    logout:()=>{},
  },
};
