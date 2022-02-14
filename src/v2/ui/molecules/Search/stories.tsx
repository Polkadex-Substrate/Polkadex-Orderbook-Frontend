import { Story, Meta } from "@storybook/react";

import { Search as SearchComponent } from "./";

export default {
  title: "Molecules/Search",
  component: SearchComponent,
} as Meta<typeof SearchComponent>;

const Template: Story = (args) => <SearchComponent {...args} />;

export const Search = Template.bind({});
