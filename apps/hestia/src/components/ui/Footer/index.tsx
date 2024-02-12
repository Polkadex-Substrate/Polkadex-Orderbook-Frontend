import {
  ChatBubbleBottomCenterIcon,
  LifebuoyIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { forwardRef, useState } from "react";
import { Dropdown, Typography } from "@polkadex/ux";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import classNames from "classnames";
import Link from "next/link";

import { Markets } from "./markets";

const items = ["Popular", "Favorite"];
export const Footer = forwardRef<HTMLDivElement, { marketsActive?: boolean }>(
  ({ marketsActive = false }, ref) => {
    const [state, setState] = useState(items[0]);
    const { connected } = useNativeApi();
    return (
      <footer
        ref={ref}
        className="md:grid md:grid-flow-col-dense md:grid-cols-2 border-y border-primary"
      >
        {marketsActive ? (
          <div className="col-span-4 flex flex-auto">
            <div className="border-r bg-level-2 px-2 border-secondary">
              <Dropdown>
                <Dropdown.Trigger className="items-center inline-flex opacity-50 transition-opacity ease-out duration-300 hover:opacity-100 w-full">
                  <Typography.Text>{state}</Typography.Text>
                  <ChevronDownIcon
                    className="ml-1 h-3 w-3 text-gray-500"
                    aria-hidden="true"
                  />
                </Dropdown.Trigger>
                <Dropdown.Content>
                  {items.map((value, i) => (
                    <Dropdown.Item onClick={() => setState(value)} key={i}>
                      <Typography.Text className="text-left block w-full">
                        {value}
                      </Typography.Text>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Content>
              </Dropdown>
            </div>
            <Markets />
          </div>
        ) : (
          <div />
        )}
        <div className="col-span-1 flex flex-1 gap-3 bg-level-1 px-2 py border-l border-secondary w-full justify-end">
          <div className="flex items-center gap-1">
            <div
              className={classNames(
                "w-2 h-2 rounded-full ",
                connected ? "bg-success-base" : "bg-attention-base"
              )}
            />
            <Typography.Text>
              {connected ? "Connected" : "Connecting"}
            </Typography.Text>
          </div>
          <Typography.Text appearance="primary">
            <ChatBubbleBottomCenterIcon className="h-3 w-3 inline-block mr-1" />
            Quick Start
          </Typography.Text>
          <Typography.Text appearance="primary">
            <Link href="https://discord.com/invite/Uvua83QAzk" target="_blank">
              <LifebuoyIcon className="h-3 w-3 inline-block mr-1" />
              Help & Support
            </Link>
          </Typography.Text>
        </div>
      </footer>
    );
  }
);

Footer.displayName = "Footer";
