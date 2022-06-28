import * as React from "react";

export function OriginalChartDoubleLine(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}>
      <rect
        stroke="none"
        x="7.989593505859375"
        y="20.303314208984375"
        width="16"
        height="1"
        rx="0.5"
        transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,-12.016513056401891,11.596198947183439)"></rect>

      <rect
        x="3.4586830139160156"
        y="15.292892456054688"
        width="16"
        height="1"
        rx="0.5"
        stroke="none"
        transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,-9.800682931907204,6.924842852749634)"></rect>
      <ellipse cx="16" cy="13" rx="1.5" ry="1.5"></ellipse>
      <ellipse cx="12" cy="17" rx="1.5" ry="1.5"></ellipse>
      <ellipse cx="9.5" cy="10" rx="1.5" ry="1.5"></ellipse>
    </svg>
  );
}
