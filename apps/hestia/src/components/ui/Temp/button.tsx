// TEMP Component
"use client";

import {
  ComponentProps,
  ElementType,
  PropsWithChildren,
  PropsWithoutRef,
  forwardRef,
} from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps extends ComponentProps<"button"> {
  asChild?: boolean;
  size?: "2xs" | "xs" | "sm" | "2sm" | "default" | "md" | "lg";
  variant?: "solid" | "ghost" | "outline" | "underline" | "light";
  appearance?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "quaternary"
    | "danger"
    | "success"
    | "attention"
    | "info";
  withIcon?: boolean;
  rounded?: boolean;
  bold?: boolean;
}

const buttonStyleClasses: Record<
  NonNullable<ButtonProps["variant"]>,
  Record<NonNullable<ButtonProps["appearance"]>, string>
> = {
  solid: {
    primary:
      "bg-primary-base enabled:hover:bg-primary-hover active:bg-primary-pressed text-white disabled:bg-disabled",
    secondary:
      "bg-secondary-base text-white hover:text-white enabled:hover:bg-secondary-hover active:bg-secondary-pressed disabled:bg-disabled",
    tertiary:
      "bg-tertiary-base text-primary enabled:hover:bg-tertiary-hover active:bg-tertiary-pressed disabled:bg-disabled",
    quaternary:
      "bg-level-1 text-white hover:text-white enabled:hover:bg-level-3 active:bg-level-4 disabled:bg-disabled",
    danger:
      "bg-danger-base enabled:hover:bg-danger-hover active:bg-danger-pressed text-white disabled:bg-disabled",
    success:
      "bg-success-base enabled:hover:bg-success-hover active:bg-success-presse text-white disabled:bg-disabled",
    attention:
      "bg-attention-base enabled:hover:bg-attention-hover active:bg-attention-pressed text-white disabled:bg-disabled",
    info: "bg-info-base enabled:hover:bg-info-hover active:bg-info-pressed text-white disabled:bg-disabled",
  },
  ghost: {
    primary:
      "enabled:hover:bg-primary-hover/20 enabled:active:bg-primary-pressed enabled:text-primary-base disabled:text-primary-base/50",
    secondary:
      "enabled:hover:text-white enabled:hover:bg-secondary-hover/40 enabled:active:bg-secondary-pressed enabled:text-primary disabled:text-primary/50",
    tertiary:
      "enabled:text-primary enabled:hover:bg-tertiary-hover/40 enabled:active:bg-tertiary-pressed enabled:text-primary disabled:text-primary/50",
    quaternary:
      "enabled:hover:text-white enabled:hover:bg-level-2/40 enabled:active:bg-level-4 enabled:text-primary disabled:text-primary/50",
    danger:
      "enabled:hover:bg-danger-hover/20 enabled:active:bg-danger-pressed enabled:text-danger-base disabled:text-danger-base/50",
    success:
      "enabled:hover:bg-success-hover/20 enabled:active:bg-success-pressed enabled:text-success-base disabled:text-success-base/50",
    attention:
      "enabled:hover:bg-attention-hover/20 enabled:active:bg-attention-pressed enabled:text-attention-base disabled:text-attention-base/50",
    info: "enabled:hover:bg-info-hover/20 enabled:active:bg-info-pressed enabled:text-info-base disabled:text-info-base/50",
  },
  outline: {
    primary:
      "border border-primary-base text-primary-base hover:text-white hover:bg-primary-hover active:bg-primary-pressed",
    secondary:
      "border border-secondary-base text-primary hover:text-white hover:bg-secondary-hover active:bg-secondary-pressed",
    tertiary:
      "border border-tertiary-base text-primary hover:bg-tertiary-hover active:bg-tertiary-pressed",
    quaternary:
      "border border-secondary text-primary hover:bg-level-1 active:bg-level-3",
    danger:
      "border border-danger-base text-danger-base hover:text-white hover:bg-danger-hover active:bg-danger-pressed",
    success:
      "border border-success-base text-success-base hover:text-white hover:bg-success-hover active:bg-success-presse",
    attention:
      "border border-attention-base text-attention-base hover:text-white hover:bg-attention-hover active:bg-attention-pressed",
    info: "border border-info-base text-info-base hover:text-white hover:bg-info-hover active:bg-info-pressed",
  },
  underline: {
    primary:
      "hover:underline text-primary-base hover:text-primary-hover active:text-primary-pressed",
    secondary:
      "hover:underline text-primary hover:text-white active:text-secondary-pressed",
    tertiary: "hover:underline text-primary active:text-tertiary-pressed",
    quaternary: "hover:underline text-actionInput active:text-primary",
    danger:
      "hover:underline text-danger-base hover:text-danger-hover active:text-danger-pressed",
    success:
      "hover:underline text-success-base hover:text-success-hover active:text-success-pressed",
    attention:
      "hover:underline text-attention-base hover:text-attention-hover active:text-attention-pressed",
    info: "hover:underline text-info-base hover:text-info-hover active:text-info-pressed",
  },
  light: {
    primary:
      "text-primary-base bg-primary-base/20 hover:bg-primary-base/30 active:bg-primary-base/40",
    secondary:
      "text-primary hover:text-white bg-secondary-base/30 hover:bg-secondary-base/40 active:bg-secondary-base/60",
    tertiary:
      "text-primary bg-tertiary-base/30 hover:bg-tertiary-base/40 active:bg-tertiary-base/60",
    quaternary:
      "text-primary bg-level-2/30 hover:bg-level-3/40 active:bg-level-4/60",
    danger:
      "text-danger-base bg-danger-base/20 hover:bg-danger-base/30 active:bg-danger-base/40",
    success:
      "text-success-base bg-success-base/20 hover:bg-success-base/30 active:bg-success-base/40",
    attention:
      "text-attention-base bg-attention-base/20 hover:bg-attention-base/30 active:bg-attention-base/40",
    info: "text-info-base bg-info-base/20 hover:bg-info-base/30 active:bg-info-base/40",
  },
};

const buttonSizeClasses = {
  "2xs": "h-5 px-1 text-2xs",
  xs: "h-6 px-1.5 text-xs",
  sm: "h-7 px-2 text-sm",
  "2sm": "h-8 px-2 text-sm",
  default: "h-9 px-4 py-2 text-sm",
  md: "h-10 px-4 py-2 text-sm",
  lg: "h-13 px-8 py-4 text-base",
};

const iconSizeClasses = {
  "2xs": "h-4 w-4 p-1",
  xs: "h-5 w-5 p-1",
  sm: "h-6 w-6 p-1.5",
  "2sm": "h-7 w-7 p-1.5",
  default: "h-8 w-8 p-2",
  md: "h-10 w-10 p-2.5",
  lg: "h-12 w-12 p-3",
};

export const Base = forwardRef<
  HTMLButtonElement | null,
  PropsWithChildren<ButtonProps>
>(
  (
    {
      className,
      asChild = false,
      size = "default",
      appearance = "primary",
      variant = "solid",
      withIcon = false,
      rounded = false,
      bold = true,
      children,
      ...props
    },
    ref
  ) => {
    const Rendercomponent: ElementType = asChild ? Slot : "button";
    return (
      <Rendercomponent
        ref={ref}
        className={twMerge(
          classNames(
            "transition-colors duration-300",
            "flex items-center justify-center whitespace-nowrap",
            "disabled:cursor-not-allowed disabled:select-none ",
            withIcon ? iconSizeClasses[size] : buttonSizeClasses[size],
            rounded ? "rounded-full" : "rounded-sm",
            withIcon && "group",
            bold && "font-medium",
            buttonStyleClasses[variant][appearance]
          ),
          className
        )}
        {...props}
      >
        {children}
      </Rendercomponent>
    );
  }
);
Base.displayName = "Base";

const Solid = forwardRef<
  HTMLButtonElement,
  PropsWithoutRef<Omit<ButtonProps, "variant">>
>((props, ref) => <Base ref={ref} variant="solid" {...props} />);
Solid.displayName = "Solid";

const Ghost = forwardRef<
  HTMLButtonElement,
  PropsWithoutRef<Omit<ButtonProps, "variant" | "withIcon">>
>((props, ref) => <Base ref={ref} variant="ghost" {...props} />);
Ghost.displayName = "Ghost";

const Outline = forwardRef<
  HTMLButtonElement,
  PropsWithoutRef<Omit<ButtonProps, "variant" | "withIcon">>
>((props, ref) => <Base ref={ref} variant="outline" {...props} />);
Outline.displayName = "Outline";

const Underline = forwardRef<
  HTMLButtonElement,
  PropsWithoutRef<Omit<ButtonProps, "variant" | "withIcon">>
>((props, ref) => <Base ref={ref} variant="underline" {...props} />);
Underline.displayName = "Underline";

const Light = forwardRef<
  HTMLButtonElement,
  PropsWithoutRef<Omit<ButtonProps, "variant" | "withIcon">>
>((props, ref) => <Base ref={ref} variant="light" {...props} />);
Light.displayName = "Light";

const Icon = forwardRef<
  HTMLButtonElement,
  PropsWithoutRef<Omit<ButtonProps, "withIcon">>
>(({ variant = "solid", appearance = "secondary", ...props }, ref) => (
  <Base
    ref={ref}
    variant={variant}
    appearance={appearance}
    withIcon
    {...props}
  />
));
Icon.displayName = "Icon";

export const Button = {
  Solid,
  Ghost,
  Outline,
  Underline,
  Light,
  Icon,
};
