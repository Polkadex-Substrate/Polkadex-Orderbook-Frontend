import { Story, Meta } from "@storybook/react";

import { News as NewsComponent } from "./";

export default {
  title: "Organisms/News",
  component: NewsComponent,
} as Meta<typeof NewsComponent>;

const Template: Story = (args) => <NewsComponent {...args} />;

export const News = Template.bind({});
