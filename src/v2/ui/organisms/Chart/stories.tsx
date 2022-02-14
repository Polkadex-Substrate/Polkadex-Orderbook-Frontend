import { Story, Meta } from "@storybook/react";

import { Chart as ChartComponent } from "./";

export default {
  title: "Organisms/Chart",
  component: ChartComponent,
} as Meta<typeof ChartComponent>;

const Template: Story = (args) => <ChartComponent {...args} />;

export const Chart = Template.bind({});
