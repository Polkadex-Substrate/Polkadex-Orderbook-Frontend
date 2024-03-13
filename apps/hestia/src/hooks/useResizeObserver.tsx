import { ResizeObserver } from "@juggle/resize-observer";
import { useResizeObserver } from "usehooks-ts";

if (!window.ResizeObserver) {
  window.ResizeObserver = ResizeObserver;
}

export { useResizeObserver };
