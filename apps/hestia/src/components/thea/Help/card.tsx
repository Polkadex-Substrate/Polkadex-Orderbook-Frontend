import { Typography } from "@polkadex/ux";
import { RiExternalLinkLine } from "@remixicon/react";
import Link from "next/link";
import { HTMLAttributeAnchorTarget, PropsWithChildren } from "react";

export const Card = ({
  description,
  title,
  href,
  target,
  children,
}: PropsWithChildren<{
  description?: string;
  title: string;
  href: string;
  target?: HTMLAttributeAnchorTarget;
}>) => {
  return (
    <div className="flex-1 w-full max-md:first:border-b md:h-full flex items-center max-lg:flex-row-reverse px-5 py-6 h-fit gap-4 border-secondary-base">
      {children}
      <div className="flex flex-col gap-2 max-w-[25rem]">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Typography.Paragraph
              size="md"
              className="font-medium leading-normal"
            >
              {title}
            </Typography.Paragraph>
            <Link href={href} target={target}>
              <RiExternalLinkLine className="w-4 h-4 opacity-50" />
            </Link>
          </div>
          {description && (
            <Typography.Paragraph appearance="primary" size="sm">
              {description}
            </Typography.Paragraph>
          )}
        </div>
      </div>
    </div>
  );
};
