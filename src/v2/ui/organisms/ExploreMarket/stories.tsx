import { Story, Meta } from "@storybook/react";

import { ExploreMarket as ExploreMarketComponent } from "./";

export default {
  title: "Organisms/Explore Market",
  component: ExploreMarketComponent,
} as Meta<typeof ExploreMarketComponent>;

const Template: Story = (args) => <ExploreMarketComponent {...args} />;

export const ExploreMarket = Template.bind({});
