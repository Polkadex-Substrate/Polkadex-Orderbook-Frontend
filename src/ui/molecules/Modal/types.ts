import { FC, PropsWithChildren } from "react";

import { Body } from "./body";
import { Footer } from "./footer";
import { Header } from "./header";
import { useModal } from "./useModal";

import { BackgroundStyle, BorderStyle, Direction } from "@polkadex/web-helpers";

export type UseModalReturn = ReturnType<typeof useModal>;

export type ModalProps = {
  onOpen?: () => void;
  onClose?: () => void;
  open?: boolean;
  closeButton?: boolean;
  isDismissable?: boolean;
  preventClose?: boolean;
} & ModalStyleProps;

export type ModalStyleProps = {
  border?: BorderStyle;
  bgStyle?: BackgroundStyle;
  isFull?: boolean;
  isBlur?: boolean;
  placement?: Direction;
  isFullWidth?: boolean;
  isFullHeight?: boolean;
};

export type ModalComponent = FC<PropsWithChildren<ModalProps>>;
export type ModalBaseComponent = ModalComponent & {
  Header: typeof Header;
  Body: typeof Body;
  Footer: typeof Footer;
};
