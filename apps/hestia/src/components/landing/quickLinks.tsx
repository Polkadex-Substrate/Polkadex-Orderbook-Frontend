import { Button, Typography } from "@polkadex/ux";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import { Icons } from "@/components/ui";

export const QuickLinks = () => {
  return (
    <section className="max-md:flex-col flex gap-10 max-w-screen-xl mx-auto w-fulll max-xl:px-2">
      <div className="flex flex-col gap-5 max-md:py-4 md:py-10 max-md:border-b md:border-r border-primary">
        <div className="flex flex-col gap-2">
          <Typography.Heading type="h4">FAQs</Typography.Heading>
          <Typography.Paragraph appearance="primary">
            Explore our Frequently Asked Questions section for in-depth guidance
            on specific features.
          </Typography.Paragraph>
        </div>
        <Button.Underline className="p-0 h-fit w-fit">
          Explore FAQ
          <ArrowRightIcon className="w-4 h-4 mr-4" />
        </Button.Underline>
      </div>
      <div className="flex flex-col max-md:py-4 gap-5 md:p-10">
        <div className="flex flex-col gap-2">
          <Typography.Heading type="h4">Join our community</Typography.Heading>
          <Typography.Paragraph appearance="primary">
            Polkadex Community connects users from 100+ countries and supports
            5+ languages.
          </Typography.Paragraph>
        </div>

        <div className="flex items-center gap-2">
          <Button.Light appearance="tertiary">
            <Icons.Discord className="w-4 h-4 mr-4 fill-slate-600" />
            Discord
          </Button.Light>
          <Button.Light appearance="secondary">
            <Icons.Telegram className="w-4 h-4 mr-4 fill-slate-600" />
            Telegram
          </Button.Light>
        </div>
      </div>
    </section>
  );
};
