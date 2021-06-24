import * as React from "react";

function SvgCandles(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 13.046 23.189"
      {...props}
    >
      <g data-name="Group 3485" transform="translate(0 1)">
        <path
          d="M10.346 0v21.189"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeMiterlimit={10}
          strokeWidth={2}
        />
        <rect
          data-name="Rectangle 11"
          width={5.4}
          height={14.262}
          rx={1}
          transform="translate(7.646 3.764)"
        />
        <path
          data-name="Line"
          d="M2.7 3.066v18.123"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeMiterlimit={10}
          strokeWidth={2}
          opacity={0.1}
        />
        <rect
          data-name="Rectangle 11"
          width={5.4}
          height={11.204}
          rx={1}
          transform="translate(0 6.822)"
          fill="#494550"
        />
      </g>
    </svg>
  );
}

export default SvgCandles;
