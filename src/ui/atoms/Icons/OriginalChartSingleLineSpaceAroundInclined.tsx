import * as React from "react";

export function OriginalChartSingleLineSpaceAroundInclined(
  props: React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}>
      <rect
        stroke="none"
        x="6.989593505859375"
        y="16.303314208984375"
        width="15"
        height="1"
        rx="0.5"
        transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,-9.480979210977239,9.71751925443823)"></rect>
      <ellipse cx="13" cy="11" rx="1.5" ry="1.5"></ellipse>
      <ellipse cx="8" cy="16" rx="1.5" ry="1.5"></ellipse>
    </svg>
  );
}
