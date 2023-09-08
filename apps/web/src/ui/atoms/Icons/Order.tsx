import * as React from "react";

function SvgOrder(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 15 13.5"
      {...props}>
      <g data-name="Group 3462" fill="none" strokeWidth={1.5}>
        <path data-name="Path 8113" d="M0 12.75h15" stroke="#e6007a" />
        <path data-name="Line 18" stroke="#0ca564" d="M0 4.75h15" />
        <path data-name="Line 20" stroke="#e6007a" d="M0 8.75h15" />
        <path data-name="Line 19" stroke="#0ca564" d="M0 .75h15" />
      </g>
    </svg>
  );
}

export default SvgOrder;
