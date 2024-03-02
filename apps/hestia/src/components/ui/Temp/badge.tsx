import { Typography } from "@polkadex/ux";
import { ReactNode } from "react";

const Badge = ({ value, children }: { value: number; children: ReactNode }) => {
  return (
    <>
      <div className="relative">
        {children}
        {value > 0 && (
          <Typography.Text
            size="xs"
            className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 bg-primary-base rounded-full px-1 text-center align-middle"
          >
            {value > 9 ? `9+` : `${value}`}
          </Typography.Text>
        )}
      </div>
    </>
  );
};

export default Badge;
