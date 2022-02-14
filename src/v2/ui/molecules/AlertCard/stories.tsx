import { Story, Meta } from "@storybook/react";

import { AlertCard as AlertCardComponent } from ".";

export default {
  title: "Molecules/Alert Card",
  component: AlertCardComponent,
} as Meta<typeof AlertCardComponent>;

const Template: Story = (args) => <AlertCardComponent {...args} />;

export const AlertCard = Template.bind({});
AlertCard.args = {
  title: "Uh oh, something went wrong",
  description: "Sorry! There was a problem with your request",
};
