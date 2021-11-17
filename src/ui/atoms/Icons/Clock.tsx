import * as React from "react";

function SvgClock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 14 14"
      {...props}>
      <g data-name="Group 3516" fill="none" stroke="#d8ac19" strokeWidth={1.5}>
        <g data-name="Ellipse 6">
          <circle cx={7} cy={7} r={7} stroke="none" />
          <circle cx={7} cy={7} r={6.25} />
        </g>
        <path data-name="Path 8127" d="M6.297 3.486v4.141h4.275" opacity={0.5} />
      </g>
    </svg>
  );
}

export default SvgClock;
