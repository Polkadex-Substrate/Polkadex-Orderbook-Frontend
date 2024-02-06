import { Logo, Typography } from "@polkadex/ux";
import Link from "next/link";
import React from "react";

import { Icons } from "@/components/ui";

export const Footer = () => {
  return (
    <footer className="max-w-screen-2xl max-2xl:px-2 mx-auto w-full border-t border-primary">
      <div className="flex flex-wrap gap-10 justify-between py-10">
        <Logo.Orderbook className="min-w-[150px] h-7 flex-1" />
        {data.map((value) => (
          <div key={value.title} className="flex-1 flex flex-col gap-4">
            <Typography.Heading type="h4" size="md">
              {value.title}
            </Typography.Heading>
            <div className="flex flex-col gap-3">
              {value.links.map((val) => (
                <Typography.Text
                  key={val.title}
                  appearance="primary"
                  className="hover:text-current duration-300 transition-colors whitespace-nowrap"
                >
                  <Link href={val.href} target={val.target}>
                    {val.title}
                  </Link>
                </Typography.Text>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="max-md:flex-col gap-3 flex md:items-center justify-between py-5 border-t border-primary">
        <div className="max-md:flex-1 flex items-center max-md:justify-between gap-4">
          <Typography.Text>Copyright ©2023 Polkadex Inc.</Typography.Text>
          <Typography.Text
            appearance="primary"
            className="hover:text-current duration-300 transition-colors"
          >
            <Link href="/">Terms and conditions</Link>
          </Typography.Text>
          <Typography.Text
            appearance="primary"
            className="hover:text-current duration-300 transition-colors"
          >
            <Link href="/">Privacy policy</Link>
          </Typography.Text>
        </div>
        <div className="flex items-center gap-2">
          {socialMedia.map((val) => {
            const IconCompontent = Icons[val.iconName as keyof typeof Icons];

            return (
              <Link
                href={val.href}
                key={val.iconName}
                className="grid place-content-center w-7 h-7"
              >
                <IconCompontent className="w-4 h-4 fill-white" />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

const data = [
  {
    title: "About us",
    links: [
      {
        title: "Overview",
        href: "https://polkadex.trade",
        target: "_target",
      },
      {
        title: "Roadmap",
        href: "https://polkadex.trade",
        target: "_target",
      },
      {
        title: "Token economics",
        href: "https://polkadex.trade",
        target: "_target",
      },
    ],
  },
  {
    title: "Products",
    links: [
      {
        title: "Orderbook",
        href: "https://polkadex.trade",
        target: "_target",
      },
      {
        title: "THEA Crosschain",
        href: "https://polkadex.trade",
        target: "_target",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        title: "Github Repository",
        href: "https://polkadex.trade",
        target: "_target",
      },
      {
        title: "Tutorials",
        href: "https://polkadex.trade",
        target: "_target",
      },
      {
        title: "Substrate",
        href: "https://polkadex.trade",
        target: "_target",
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        title: "Help center",
        href: "https://polkadex.trade",
        target: "_target",
      },
      {
        title: "Report issues",
        href: "https://polkadex.trade",
        target: "_target",
      },
      {
        title: "Beginner's guide",
        href: "https://polkadex.trade",
        target: "_target",
      },
    ],
  },
];

const socialMedia = [
  {
    alt: "Twitter logo",
    iconName: "Twitter",
    href: "/",
  },
  {
    alt: "Telegram logo",
    iconName: "Telegram",
    href: "/",
  },
  {
    alt: "Medium logo",
    iconName: "Medium",
    href: "/",
  },
  {
    alt: "Reddit logo",
    iconName: "Reddit",
    href: "/",
  },
  {
    alt: "Discord logo",
    iconName: "Discord",
    href: "/",
  },
];
