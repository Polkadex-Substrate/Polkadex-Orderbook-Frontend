import { Story, Meta } from "@storybook/react";

import { Markets as MarketsComponent } from "./";

export default {
  title: "Organisms/Markets",
  component: MarketsComponent,
} as Meta<typeof MarketsComponent>;

const Template: Story = (args) => <MarketsComponent {...args} />;

export const Markets = Template.bind({});
