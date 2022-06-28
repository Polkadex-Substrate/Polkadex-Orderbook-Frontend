import * as React from "react";

export function OriginalChartQuaternaryLine(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}>
      <rect stroke="none" x="4" y="6" width="16" height="1" rx="0.5"></rect>
      <rect stroke="none" x="4" y="9" width="16" height="1" rx="0.5"></rect>
      <rect stroke="none" x="4" y="15" width="16" height="1" rx="0.5"></rect>
      <rect stroke="none" x="4" y="18" width="16" height="1" rx="0.5"></rect>
      <rect stroke="none" x="4" y="12" width="16" height="1" rx="0.5"></rect>
      <ellipse cx="12" cy="18.5" rx="1.5" ry="1.5"></ellipse>
      <ellipse cx="16" cy="6.5" rx="1.5" ry="1.5"></ellipse>
      <ellipse cx="8" cy="6.5" rx="1.5" ry="1.5"></ellipse>
    </svg>
  );
}
