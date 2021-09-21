import { LinkHTMLAttributes } from "react";
import { IIcons } from "src/utils/types";

type Props = {
  text: string;
  icon?: IIcons;
  active?: boolean;
} & Pick<
  LinkHTMLAttributes<HTMLLinkElement>,
  "href" | "style" | "role" | "onClick"
>;

export default Props;
