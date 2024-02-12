import { Button, Popover, Typography } from "@polkadex/ux";

import { Icons } from "..";

interface RangeProps {
  popover?: boolean;
  ranges: {
    value: string;
    action: () => void;
  }[];
}
const styles =
  "flex flex-1 flex-col items-center justify-center text-primary hover:text-textBase h-7 border border-secondary px-1 rounded duration-300 ease-in-out transition-colors";
export const Range = ({ ranges, popover = false }: RangeProps) => {
  return (
    <div className="flex flex-1 justify-between gap-2 items-center">
      {ranges.map(({ value, action }, i) => (
        <Button.Outline
          appearance="secondary"
          key={i}
          onClick={(e) => {
            e.preventDefault();
            action();
          }}
          className={styles}
        >
          {value}
        </Button.Outline>
      ))}
      {popover && (
        <Popover>
          <Popover.Trigger className={styles}>
            <Icons.Range className="w-6 h-4" />
          </Popover.Trigger>
          <Popover.Content>
            <Typography.Text>Testing</Typography.Text>
          </Popover.Content>
        </Popover>
      )}
    </div>
  );
};
