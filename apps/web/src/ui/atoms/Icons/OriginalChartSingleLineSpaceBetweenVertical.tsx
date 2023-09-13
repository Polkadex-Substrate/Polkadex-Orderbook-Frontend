import * as React from "react";

export function OriginalChartSingleLineSpaceBetweenVertical(
  props: React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}>
      <rect stroke="none" x="11.5" y="5" width="1" height="14" rx="0.5"></rect>
      <ellipse cx="12" cy="18" rx="1.5" ry="1.5"></ellipse>
      <ellipse cx="12" cy="6" rx="1.5" ry="1.5"></ellipse>
    </svg>
  );
}
