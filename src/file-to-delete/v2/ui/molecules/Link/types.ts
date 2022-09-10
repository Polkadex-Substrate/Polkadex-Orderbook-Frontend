import { LinkHTMLAttributes } from "react";

import { Icons } from "@polkadex/web-helpers";

type Props = {
  text: string;
  icon?: Icons;
  active?: boolean;
} & Pick<LinkHTMLAttributes<HTMLLinkElement>, "href" | "style" | "role" | "onClick">;

export default Props;
