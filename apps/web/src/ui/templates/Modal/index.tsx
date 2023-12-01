import {
  ComponentProps,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { isValidComponent, placements } from "@polkadex/ux";

interface TitleProps extends AlertDialog.DialogTitleProps {
  onBack?: () => void;
}

const Title = ({
  children,
  className,
  ...props
}: PropsWithChildren<TitleProps>) => {
  return (
    <AlertDialog.Title
      className={twMerge(classNames("flex items-center gap-2"), className)}
      {...props}
    >
      {children}
    </AlertDialog.Title>
  );
};

const Footer = ({
  children,
  ...props
}: PropsWithChildren<ComponentProps<"div">>) => {
  return <div {...props}>{children}</div>;
};

const Content = ({
  children,
  ...props
}: PropsWithChildren<ComponentProps<"div">>) => {
  return <div {...props}>{children}</div>;
};

type ModalProps = {
  closeOnClickOutside?: boolean;
  placement?: (typeof placements)[number];
} & Pick<AlertDialog.DialogProps, "defaultOpen" | "open" | "onOpenChange"> &
  AlertDialog.DialogContentProps;

const modalPlace = {
  center: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  "center left": "top-1/2 left-[1%] transform -translate-y-1/2",
  "center right":
    "top-1/2 right-[1%] transform translate-x-1/2 -translate-y-1/2",
  "top center": "top-[1%] left-1/2 transform -translate-x-1/2",
  "top left": "top-[1%] left-[1%]",
  "top right": "top-[1%] right-[1%]",
  "bottom center": "bottom-[1%] left-1/2 transform -translate-x-1/2",
  "bottom left": "bottom-[1%] left-[1%]",
  "bottom right": "bottom-[1%] right-[1%]",
};

const Modal = ({
  children,
  open,
  onOpenChange,
  defaultOpen,
  closeOnClickOutside,
  className,
  placement = "center",
  ...props
}: PropsWithChildren<ModalProps>) => {
  const [TitleComponent] = isValidComponent(children, Title);
  const [ContentComponent] = isValidComponent(children, Content);
  const [FooterComponent] = isValidComponent(children, Footer);
  const containerRef = useRef<HTMLElement | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, forceRender] = useState(0);
  useEffect(() => {
    containerRef.current = document.body;
    forceRender((prev) => prev + 1);
  }, []);

  return (
    <AlertDialog.Root
      onOpenChange={onOpenChange}
      open={open}
      defaultOpen={defaultOpen}
      {...props}
    >
      <AlertDialog.Portal container={containerRef.current}>
        <AlertDialog.Overlay
          className={classNames(
            "backdrop-blur-primary inset-0 fixed",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
          onClick={
            closeOnClickOutside ? () => onOpenChange?.(false) : undefined
          }
        />
        <AlertDialog.Content
          className={classNames(
            "fixed z-50 max-sm:w-full max-md:w-auto h-auto overflow-auto max-h-screen",
            "duration-200 shadow-lg",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            modalPlace[placement],
            className
          )}
          {...props}
        >
          {TitleComponent}
          {ContentComponent}
          {FooterComponent}
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

Modal.Title = Title;
Modal.Content = Content;
Modal.Footer = Footer;

export { Modal };
