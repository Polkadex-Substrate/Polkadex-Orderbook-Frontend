import { Dropdown, Input } from "@polkadex/ux";
import { PropsWithChildren } from "react";

import { Card } from "./card";

import { chains } from "@/components/ui/ConnectWallet/connectWallet";

type Chain = (typeof chains)[0];

const SelectChain = ({
  children,
  chains,
  onChange,
}: PropsWithChildren<{
  chains: Chain[];
  onChange: (v: Chain) => void;
}>) => {
  return (
    <Dropdown>
      <Dropdown.Trigger className="w-full">{children}</Dropdown.Trigger>
      <Dropdown.Content className="flex flex-col">
        <div className="p-4 border-b border-primary">
          <Input.Search placeholder="Search token or chain..." />
        </div>
        {chains?.map((value) => (
          <Dropdown.Item
            key={value.name}
            onClick={() => onChange(value)}
            disabled={!value.active}
            className="p-0"
          >
            <Card
              title={value.name}
              description={value?.description}
              icon={value.icon}
            />
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
};
SelectChain.Card = Card;
export { SelectChain };
