import { Story, Meta } from "@storybook/react";

import { Notifications as NotificationsComponent } from "./";

export default {
  title: "Molecules/Notifications",
  component: NotificationsComponent,
} as Meta<typeof NotificationsComponent>;

const Template: Story = (args) => <NotificationsComponent {...args} />;

export const Notifications = Template.bind({});
