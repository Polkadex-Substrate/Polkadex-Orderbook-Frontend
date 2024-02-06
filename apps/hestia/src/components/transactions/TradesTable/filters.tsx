import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Button, Dropdown, Typography } from "@polkadex/ux";

export const Filters = () => {
  return (
    <div className="flex items-center gap-4 p-3 ">
      <div className="flex-[3_3_0%] flex items-center gap-2 flex-wrap">
        <Dropdown>
          <Dropdown.Trigger className="items-end justify-between flex-1 border border-primary whitespace-nowrap rounded-md p-2">
            <div className="flex flex-col items-start gap-1">
              <Typography.Text appearance="primary" size="xs">
                Type
              </Typography.Text>
              <Typography.Text>Funding to trading</Typography.Text>
            </div>
            <Dropdown.Icon />
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.ItemRadio value="fundingToTrading">
              Funding to trading
            </Dropdown.ItemRadio>
            <Dropdown.ItemRadio value="fundingToTrading">
              Trading to funding
            </Dropdown.ItemRadio>
          </Dropdown.Content>
        </Dropdown>
        <Dropdown>
          <Dropdown.Trigger className="items-end justify-between flex-1 border border-primary whitespace-nowrap rounded-md p-2">
            <div className="flex flex-col items-start gap-1">
              <Typography.Text appearance="primary" size="xs">
                Time
              </Typography.Text>
              <Typography.Text>Past 7 days</Typography.Text>
            </div>
            <Dropdown.Icon />
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.ItemRadio value="fundingToTrading">
              Past 30 days
            </Dropdown.ItemRadio>
            <Dropdown.ItemRadio value="fundingToTrading">
              Past 7 days days
            </Dropdown.ItemRadio>
          </Dropdown.Content>
        </Dropdown>
        <Dropdown>
          <Dropdown.Trigger className="items-end justify-between flex-1 border border-primary whitespace-nowrap rounded-md p-2">
            <div className="flex flex-col items-start gap-1">
              <Typography.Text appearance="primary" size="xs">
                Token
              </Typography.Text>
              <Typography.Text>All</Typography.Text>
            </div>
            <Dropdown.Icon />
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.ItemRadio value="fundingToTrading">
              All tokens
            </Dropdown.ItemRadio>
            <Dropdown.ItemRadio value="fundingToTrading">
              Polkadot
            </Dropdown.ItemRadio>
          </Dropdown.Content>
        </Dropdown>
        <Dropdown>
          <Dropdown.Trigger className="items-end justify-between flex-1 border border-primary whitespace-nowrap rounded-md p-2">
            <div className="flex flex-col items-start gap-1">
              <Typography.Text appearance="primary" size="xs">
                Status
              </Typography.Text>
              <Typography.Text>All</Typography.Text>
            </div>
            <Dropdown.Icon />
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.ItemRadio value="fundingToTrading">
              All
            </Dropdown.ItemRadio>
            <Dropdown.ItemRadio value="fundingToTrading">
              Polkadot
            </Dropdown.ItemRadio>
          </Dropdown.Content>
        </Dropdown>
      </div>
      <div className="flex-auto flex items-center justify-end">
        <Button.Outline appearance="secondary" size="sm">
          <ArrowDownTrayIcon className="w-4 h-4 inline-block mr-1" />
          Export
        </Button.Outline>
      </div>
    </div>
  );
};
