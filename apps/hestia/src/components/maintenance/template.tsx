"use client";

import Link from "next/link";
import { Button, Logo, Typography } from "@polkadex/ux";
import Image from "next/image";
import { RiDiscordFill, RiTelegramFill, RiTwitterFill } from "@remixicon/react";

import MaintenanceIllustration from "../../../public/img/maintenance.webp";

export function Template() {
  return (
    <div className="min-h-screen flex bg-backgroundBase">
      <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-2">
        <div className="p-4">
          <Link href="/">
            <div className="max-w-[150px] mx-auto">
              <Logo.Orderbook />
            </div>
          </Link>
        </div>
        <div className="flex-1 h-full flex max-md:flex-col bg-level-0 rounded-lg items-center md:px-4">
          <div className="flex flex-col gap-5 max-md:p-3 md:p-12 max-w-[500px]">
            <Typography.Heading size="5xl">
              We&apos;re improving your experience
            </Typography.Heading>
            <Typography.Text size="md">
              We&apos;ll be back up and running again shortly.
            </Typography.Text>
            <div className="flex flex-col gap-2">
              <Typography.Text appearance="primary">Need help?</Typography.Text>
              <div className="flex items-center gap-2 flex-wrap">
                <Button.Icon
                  asChild
                  size="md"
                  className="gap-2 w-fit"
                  appearance="secondary"
                >
                  <Link
                    target="_blank"
                    href="https://discord.com/invite/Uvua83QAzk"
                  >
                    <RiDiscordFill className="w-full h-full" />
                  </Link>
                </Button.Icon>
                <Button.Icon
                  asChild
                  size="md"
                  className="gap-2 w-fit"
                  appearance="secondary"
                >
                  <Link target="_blank" href="https://t.me/Polkadex">
                    <RiTelegramFill className="w-full h-full" />
                  </Link>
                </Button.Icon>
                <Button.Icon
                  asChild
                  size="md"
                  className="gap-2 w-fit"
                  appearance="secondary"
                >
                  <Link target="_blank" href="https://twitter.com/polkadex">
                    <RiTwitterFill className="w-full h-full" />
                  </Link>
                </Button.Icon>
              </div>
            </div>
          </div>
          <div className="max-md:mt-4 flex-1">
            <Image
              src={MaintenanceIllustration}
              placeholder="blur"
              alt="access denied"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
