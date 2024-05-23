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
          <Link href={href} target={target}>
            <div className="flex items-center gap-2">
              <Typography.Paragraph
                size="md"
                className="font-medium leading-normal"
              >
                {title}
              </Typography.Paragraph>
              <RiExternalLinkLine className="w-3 h-3 opacity-50" />
            </div>
          </Link>
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
