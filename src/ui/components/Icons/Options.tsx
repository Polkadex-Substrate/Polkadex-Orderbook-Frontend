import * as React from "react";

function SvgOptions(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 4 20"
      {...props}
    >
      <g data-name="Group 3506" transform="translate(-.154)">
        <circle
          data-name="Ellipse 3"
          cx={2}
          cy={2}
          r={2}
          transform="translate(.154)"
        />
        <circle
          data-name="Ellipse 4"
          cx={2}
          cy={2}
          r={2}
          transform="translate(.154 8)"
        />
        <circle
          data-name="Ellipse 5"
          cx={2}
          cy={2}
          r={2}
          transform="translate(.154 16)"
        />
      </g>
    </svg>
  );
}

export default SvgOptions;
