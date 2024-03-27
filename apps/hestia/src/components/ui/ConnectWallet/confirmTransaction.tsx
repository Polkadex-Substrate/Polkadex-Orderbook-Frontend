"use client";

import {
  Accordion,
  Copy,
  Dropdown,
  Interaction,
  Typography,
} from "@polkadex/ux";
import { RiAddLine, RiFileCopyLine, RiGasStationLine } from "@remixicon/react";
import { useRef } from "react";
import { useResizeObserver } from "usehooks-ts";

export const ConfirmTransaction = ({ onClose }: { onClose: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);

  const { width = 0 } = useResizeObserver({
    ref,
    box: "border-box",
  });

  return (
    <Interaction className="w-full md:min-w-[24rem] md:max-w-[24rem]">
      <Interaction.Title onClose={{ onClick: onClose }}>
        Confirm Transaction
      </Interaction.Title>
      <Interaction.Content className="flex flex-col p-3">
        <div className="flex flex-col border-b border-primary px-3 pb-4">
          <Typography.Text appearance="primary">Extrinsic</Typography.Text>
          <Accordion type="multiple">
            <Accordion.Item value="extrinsic">
              <Accordion.Trigger>
                <Typography.Text>ocex.addProxyAccount</Typography.Text>
                <Accordion.Icon>
                  <RiAddLine className="w-4 h-4 text-primary" />
                </Accordion.Icon>
              </Accordion.Trigger>
              <Accordion.Content>
                <Typography.Text appearance="primary">
                  [Pallet::add_proxy_account]
                </Typography.Text>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="flex flex-col border-b border-primary">
          <div className="flex items-cneter justify-between gap-2 px-3 py-3">
            <Typography.Text appearance="primary">Sending from</Typography.Text>
            <Copy value="0xD3…6Ae">
              <div className="flex items-center gap-1">
                <RiFileCopyLine className="w-3 h-3 text-secondary" />
                <Typography.Text>Orderbook • 0xD3…6Ae</Typography.Text>
              </div>
            </Copy>
          </div>
          <div className="flex items-cneter justify-between gap-2 px-3 py-3">
            <Typography.Text appearance="primary">Call hash</Typography.Text>
            <Copy value="0xD3…6Ae">
              <div className="flex items-center gap-1">
                <RiFileCopyLine className="w-3 h-3 text-secondary" />
                <Typography.Text>0x706ef84f...48985697</Typography.Text>
              </div>
            </Copy>
          </div>
          <Dropdown>
            <Dropdown.Trigger ref={ref} className=" px-3 py-3 bg-level-1">
              <div className="flex-1  w-full flex items-cneter justify-between gap-2">
                <Typography.Text appearance="primary">
                  Pay fee with
                </Typography.Text>
                <Typography.Text>PDEX</Typography.Text>
              </div>
              <Dropdown.Icon />
            </Dropdown.Trigger>
            <Dropdown.Content style={{ width }}>
              <Dropdown.Item>PDEX</Dropdown.Item>
              <Dropdown.Item>DOT</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
          <div className="flex items-cneter justify-between gap-2 px-3 py-3">
            <Typography.Text appearance="primary">
              Estimated fee
            </Typography.Text>
            <div className="flex items-center gap-1">
              <RiGasStationLine className="w-3 h-3 text-secondary" />
              <Typography.Text>1.0182 PDEX</Typography.Text>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 px-3 pt-4">
          <Typography.Text appearance="secondary" bold>
            Terms and conditions
          </Typography.Text>
          <div className="overflow-hidden relative">
            <div className=" max-h-24 overflow-auto pb-6">
              <Typography.Paragraph size="sm" appearance="primary">
                By accessing this website we assume you accept these terms and
                conditions. Do not continue to use Orderbook if you do not agree
                to take all of the terms and conditions stated on this page. The
                following terminology applies to these Terms and Conditions,
                Privacy Statement and Disclaimer Notice and all Agreements:
                Client, You and Your refers to you, the person log on this
                website and compliant to the Companys terms and conditions. By
                accessing this website we assume you accept these terms and
                conditions. Do not continue to use Orderbook if you do not agree
                to take all of the terms and conditions stated on this page. The
                following terminology applies to these Terms and Conditions,
                Privacy Statement and Disclaimer Notice and all Agreements:
                Client, You and Your refers to you, the person log on this
                website and compliant to the Companys terms and conditions.
              </Typography.Paragraph>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[45px] bg-gradient-to-t from-level-0 to-transparent" />
          </div>
        </div>
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Action
          appearance="secondary"
          onClick={() => window.alert("testing...")}
        >
          Sign and Submit
        </Interaction.Action>
        <Interaction.Close onClick={onClose}>Close</Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
