import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { ComponentProps, PropsWithChildren } from "react";
import { Accordion, Dropdown, Typography } from "@polkadex/ux";
import classNames from "classnames";

interface DropdownProps {
  items: {
    href: string;
    label: string;
  }[];
}

const AccordionMenu = ({
  items,
  children,
}: PropsWithChildren<DropdownProps>) => (
  <Accordion type="multiple">
    <Accordion.Item value={children?.toString() ?? ""}>
      <Accordion.Trigger>
        <Typography.Text size="lg" bold>
          {children as string}
        </Typography.Text>
        <Accordion.Icon />
      </Accordion.Trigger>
      <Accordion.Content className="flex flex-col gap-3">
        {items.map(({ href, label }, i) => (
          <Typography.Text key={i} size="md" asChild>
            <Link href={href} target="_blank" className="w-full">
              {label}
            </Link>
          </Typography.Text>
        ))}
      </Accordion.Content>
    </Accordion.Item>
  </Accordion>
);

interface SingleProps extends ComponentProps<"a"> {
  size?: "lg" | "sm";
  disabled?: boolean;
}
const Single = ({
  href,
  size = "sm",
  disabled = false,
  children,
}: PropsWithChildren<SingleProps>) => {
  const largeText = size === "lg";
  return (
    <Typography.Text
      asChild
      size={size}
      bold={largeText}
      appearance={largeText ? "base" : "primary"}
      className={classNames(
        !disabled &&
          "transition-colors ease-out duration-300 hover:text-primary-base",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <Link href={disabled ? "#" : (href as Url)}>{children}</Link>
    </Typography.Text>
  );
};

const DropdownMenu = ({
  items,
  children,
}: PropsWithChildren<DropdownProps>) => (
  <Dropdown>
    <Dropdown.Trigger className="gap-2 items-center inline-flex opacity-50 transition-opacity ease-out duration-300 hover:opacity-100 w-full">
      <Typography.Text className="text-sm">
        {children as string}
      </Typography.Text>
      <Dropdown.Icon />
    </Dropdown.Trigger>
    <Dropdown.Content>
      {items.map(({ href, label }, i) => (
        <Dropdown.Item key={i}>
          <Link
            href={href}
            target="_blank"
            className="text-left block text-sm w-full"
          >
            {label}
          </Link>
        </Dropdown.Item>
      ))}
    </Dropdown.Content>
  </Dropdown>
);
export const HeaderLink = {
  Accordion: AccordionMenu,
  Dropdown: DropdownMenu,
  Single,
};
