import { PropsWithChildren } from "react";
import { usePreventScroll } from "@react-aria/overlays";

export const Content = ({ children }: PropsWithChildren<object>) => {
  // Prevent scrolling while the modal is open, and hide content
  // outside the modal from screen readers.
  usePreventScroll();
  return <>{children}</>;
};
