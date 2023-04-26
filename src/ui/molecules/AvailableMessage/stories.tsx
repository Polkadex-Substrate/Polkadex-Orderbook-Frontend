import type { Meta, StoryObj } from "@storybook/react";

import { AvailableMessage } from ".";
export default {
  title: "Molecules/AvailableMessage",
  component: AvailableMessage,
  tags: ["autodocs"],
} as Meta<typeof AvailableMessage>;

export const Default: StoryObj<typeof AvailableMessage> = {
  args: {
    message: "Not available in Beta",
    color: "tertiaryBackground",
    children: "testing",
    isVisible: true,
    isPriority: false,
  },
};
