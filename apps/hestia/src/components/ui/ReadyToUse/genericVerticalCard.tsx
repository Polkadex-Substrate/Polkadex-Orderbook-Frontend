import classNames from "classnames";
import { MouseEvent } from "react";
import { Button, Icon, Typography } from "@polkadex/ux";
import type { IconsProps } from "@polkadex/ux";

export const GenericVerticalCard = ({
  title,
  icon,
  onSelect,
  buttonAction,
  buttonTitle,
  checked,
  disabled,
}: {
  title: string;
  icon: IconsProps;
  onSelect: () => void;
  buttonAction?: (e: MouseEvent<HTMLButtonElement>) => void;
  buttonTitle?: string;
  checked?: boolean;
  disabled?: boolean;
}) => {
  return (
    <div
      role="button"
      onClick={disabled ? undefined : onSelect}
      className={classNames(
        disabled
          ? "opacity-50"
          : " hover:bg-level-2 duration-300 transition-colors",
        "relative flex-1 flex flex-col items-center gap-2 px-3 py-7 rounded-md border border-secondary"
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8">
          <Icon name={icon} />
        </div>
        <Typography.Text appearance="primary">{title}</Typography.Text>
      </div>
      {buttonAction && (
        <Button.Solid
          appearance="tertiary"
          rounded
          size="sm"
          onClick={buttonAction}
        >
          {buttonTitle}
        </Button.Solid>
      )}
      <div
        className={classNames(
          "flex items-center justify-center w-4 h-4 rounded-full absolute top-2 right-2",
          checked ? "bg-primary-base" : "bg-level-4"
        )}
      >
        {checked && <Icon name="Check" className="h-[10px] w-[10px]" />}
      </div>
    </div>
  );
};
