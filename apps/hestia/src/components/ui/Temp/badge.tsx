import { Typography, AppearanceBackgroundVariants } from "@polkadex/ux";
import classNames from "classnames";
import { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  appearance?: AppearanceBackgroundVariants;
}

const Badge = ({
  children,
  appearance = "primary-base",
  className,
}: BadgeProps) => {
  return (
    <div className={classNames("flex items-center", className)}>
      <Typography.Text
        appearance="base"
        size="xs"
        className={classNames("rounded-full px-1", `bg-${appearance}`)}
      >
        {children}
      </Typography.Text>
    </div>
  );
};

export default Badge;
