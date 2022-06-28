import * as React from "react";

export function OriginalChartSingleLineSpaceBetweenInclined(
  props: React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}>
      <svg viewBox="0 0 24 24">
        <rect
          stroke="none"
          x="5.989593505859375"
          y="17.303298950195312"
          width="14"
          height="1"
          rx="0.5"
          transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,-10.480968421384205,9.30330124707234)"></rect>
        <ellipse cx="16" cy="8" rx="1.5" ry="1.5"></ellipse>
        <ellipse cx="7" cy="17" rx="1.5" ry="1.5"></ellipse>
      </svg>
    </svg>
  );
}
