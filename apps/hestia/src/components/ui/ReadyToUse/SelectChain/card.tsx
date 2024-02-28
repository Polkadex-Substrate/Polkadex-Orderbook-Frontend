import classNames from "classnames";
import { Typography, Token, tokenAppearance } from "@polkadex/ux";

export const Card = ({
  title,
  description,
  icon,
  hoverable,
}: {
  title: string;
  description?: string;
  icon: string;
  hoverable?: boolean;
}) => {
  return (
    <div
      className={classNames(
        "flex items-center gap-3 p-4 rounded-md w-full",
        hoverable && "hover:bg-level-1 duration-300 transition-colors"
      )}
    >
      <Token
        appearance={icon as keyof typeof tokenAppearance}
        name={icon}
        size="md"
        className="rounded-full"
      />
      <div className="flex flex-col items-start">
        <Typography.Text bold>{title}</Typography.Text>
        <Typography.Text appearance="primary">{description}</Typography.Text>
      </div>
    </div>
  );
};
