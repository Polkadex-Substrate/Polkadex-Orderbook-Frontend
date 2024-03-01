"use client";

import * as ResizablePanels from "react-resizable-panels";
import { ComponentProps, forwardRef } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { RiDraggable } from "@remixicon/react";
import type { ImperativePanelHandle } from "react-resizable-panels";

const Resizable = ({
  children,
  className,
  ...props
}: ComponentProps<typeof ResizablePanels.PanelGroup>) => {
  return (
    <ResizablePanels.PanelGroup
      className={twMerge(
        classNames(
          "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
          className
        )
      )}
      {...props}
    >
      {children}
    </ResizablePanels.PanelGroup>
  );
};

const Panel = forwardRef<
  ImperativePanelHandle,
  ComponentProps<typeof ResizablePanels.Panel>
>(({ children, ...props }, ref) => {
  return (
    <ResizablePanels.Panel ref={ref} {...props}>
      {children}
    </ResizablePanels.Panel>
  );
});
Panel.displayName = "Panel";

interface HandleProps
  extends ComponentProps<typeof ResizablePanels.PanelResizeHandle> {
  withHandle?: boolean;
}

const Handle = ({ className, withHandle, ...props }: HandleProps) => {
  return (
    <ResizablePanels.PanelResizeHandle
      className={twMerge(
        classNames(
          "relative flex w-px items-center justify-center bg-level-2",
          "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
          "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
          className
        )
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm  bg-level-5 border border-secondary">
          <RiDraggable className="h-2.5 w-2.5 rotate-180" />
        </div>
      )}
    </ResizablePanels.PanelResizeHandle>
  );
};

Resizable.Handle = Handle;
Resizable.Panel = Panel;
export { Resizable, ImperativePanelHandle };
