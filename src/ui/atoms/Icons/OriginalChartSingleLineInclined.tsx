import * as React from "react";

export function OriginalChartSingleLineInclined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}>
      <rect
        stroke="none"
        x="5.989593505859375"
        y="17.303306579589844"
        width="16"
        height="1"
        rx="0.5"
        transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,-10.480973816180722,9.303303481670355)"></rect>
      <ellipse cx="14" cy="10" rx="1.5" ry="1.5"></ellipse>
      <ellipse cx="10" cy="14" rx="1.5" ry="1.5"></ellipse>
    </svg>
  );
}
