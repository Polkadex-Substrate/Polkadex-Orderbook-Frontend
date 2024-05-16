import { CUSTOM_ADDRES_NAME } from "@orderbook/core/constants";
import { isValidAddress } from "@orderbook/core/helpers";
import { CustomAccount } from "@orderbook/core/providers";
import { Input, Separator, Typography, truncateString } from "@polkadex/ux";
import React, { useRef } from "react";

export const CustomAddress = ({
  selectedAccount,
  onSelectCustomAccount,
  showValue = false,
}: {
  selectedAccount?: CustomAccount;
  onSelectCustomAccount?: (e: CustomAccount) => void;
  showValue?: boolean;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onPaste = async () => {
    if (!buttonRef.current) return;
    try {
      const address = await navigator.clipboard.readText();

      const isValid = isValidAddress(address);

      if (!isValid || !address) {
        buttonRef.current.innerText = "Invalid address";
        return;
      }
      onSelectCustomAccount?.({
        name: CUSTOM_ADDRES_NAME,
        address,
      });
      buttonRef.current.innerText = "Pasted";
    } catch (error) {
      buttonRef.current.innerText = "Invalid address";
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-3 px-4">
      <div className="flex items-center gap-2 px-4">
        <Separator.Horizontal className=" bg-level-2" />
        <Typography.Text
          appearance="secondary"
          size="xs"
          className="whitespace-nowrap"
        >
          Or enter a custom address
        </Typography.Text>
      </div>
      <div className="pr-4 border border-primary rounded-md">
        <Input.Vertical
          disabled
          className="w-full pl-5 py-4"
          placeholder="Enter an address"
          value={
            showValue ? truncateString(selectedAccount?.address ?? "", 12) : ""
          }
        >
          <Input.Action
            ref={buttonRef}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onPaste();
            }}
            onMouseOut={() => {
              if (buttonRef.current) {
                buttonRef.current.innerText = "Paste";
              }
            }}
          >
            Paste
          </Input.Action>
        </Input.Vertical>
      </div>
    </div>
  );
};
