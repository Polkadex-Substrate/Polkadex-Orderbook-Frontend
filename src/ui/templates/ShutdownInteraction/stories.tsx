import type { Meta, StoryObj } from "@storybook/react";

import { ShutdownInteraction } from ".";

export default {
  title: "Templates/ShutdownInteraction",
  component: ShutdownInteraction,
  tags: ["autodocs"],
  argTypes: {
    onClose: {
      action: "clicked",
    },
    children: {
      type: "string",
    },
  },
} as Meta<typeof ShutdownInteraction>;

export const Default: StoryObj<typeof ShutdownInteraction> = {
  args: {
    title: "Orderbook v1 will go offline as it is upgraded to v2",
    textLink: "Read the full statement",
    link: "/",
    footerText: "Join our Telegram for more updates!",
    buttonLink: "/",
    textButton: "Join Telegram",
    imgUrl: "/img/shutdownImage.svg",
    onClose: () => window.alert("Closing.."),
  },
};
