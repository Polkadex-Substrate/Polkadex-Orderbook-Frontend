import type { Meta, StoryObj } from "@storybook/react";

import { EmptyMyAccount } from ".";
export default {
  title: "Molecules/EmptyMyAccount",
  component: EmptyMyAccount,
  tags: ["autodocs"],
} as Meta<typeof EmptyMyAccount>;

export const Default: StoryObj<typeof EmptyMyAccount> = {
  args: {
    hasLimit: false,
    image: "loginEmpty",
    title: "Looks like you're not logged in",
    description: "Explore a new way of trading with your own wallet!",
    primaryLink: "/sign",
    primaryLinkTitle: "Sign Up",
    secondaryLink: "/signIn",
    secondaryLinkTitle: "Login",
  },
};
