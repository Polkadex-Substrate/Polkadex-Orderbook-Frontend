import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { AccountBanner } from ".";
export default {
  title: "Molecules/AccountBanner",
  component: AccountBanner,
  tags: ["autodocs"],
  argTypes: {
    onClose: {
      action: "clicked",
    },
    link: {
      action: "clicked",
    },
  },
} as Meta<typeof AccountBanner>;

export const Default: StoryObj<typeof AccountBanner> = {
  args: {
    title: "Welcome back!",
    description: "Looks like you’re using this browser for the first time.",
    subDescription: "Please create a new trading account.",
    closeButtonTitle: "Close",
    linkText: "Create Account",
    link: "/settings",
    heroAlt: "Man in tie with open arms welcoming",
    heroImage: "welcomeBack.svg",
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("Close", () => userEvent.click(canvas.getAllByRole("button")[0]));
    await waitFor(() => expect(args.onClose).toHaveBeenCalled());
  },
};
