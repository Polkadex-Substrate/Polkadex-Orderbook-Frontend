import { Story, Meta } from "@storybook/react";

import { Template as TemplateContainer } from "../../atoms/Templates";

import { Markets as MarketsComponent } from "./";

export default {
  title: "Organisms/Markets",
  component: MarketsComponent,
} as Meta<typeof MarketsComponent>;

const Template: Story = (args) => (
  <TemplateContainer>
    <MarketsComponent {...args} />
  </TemplateContainer>
);

export const Markets = Template.bind({});
