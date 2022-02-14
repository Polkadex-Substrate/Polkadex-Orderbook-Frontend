import { Story, Meta } from "@storybook/react";

import { Information as InformationComponent } from "./";

export default {
  title: "Organisms/Information",
  component: InformationComponent,
} as Meta<typeof InformationComponent>;

const Template: Story = (args) => <InformationComponent {...args} />;

export const Information = Template.bind({});
