import type { Meta, StoryObj } from "@storybook/react";

import { EmptyData } from ".";
export default {
  title: "Molecules/EmptyData",
  component: EmptyData,
  tags: ["autodocs"],
} as Meta<typeof EmptyData>;

export const Default: StoryObj<typeof EmptyData> = {
  args: {
    title: "You don't have any recent transactions",
    image: "emptyData",
    alt: "Empty Orders",
  },
};
