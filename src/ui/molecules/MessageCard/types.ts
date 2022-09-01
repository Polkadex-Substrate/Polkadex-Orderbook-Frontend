import { Props as MessageProps } from "@polkadex/orderbook-ui/organisms/Message/types";
import { AlertTypes } from "@polkadex/orderbook-modules";
import { Icons, TokensTicker } from "@polkadex/web-helpers";

export type Props = {
  icon?: Icons | TokensTicker | AlertTypes | string;
  title: string;
  description: string;
} & Partial<MessageProps>;
