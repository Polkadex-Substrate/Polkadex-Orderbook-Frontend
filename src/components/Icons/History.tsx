import * as React from "react";

function SvgHistory(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 22 16.999"
      {...props}
    >
      <g>
        <path
          data-name="c2/text-column"
          d="M13 17a1 1 0 01-1-1v-.334a1 1 0 011-1h8a1 1 0 011 1V16a1 1 0 01-1 1zm0-4.667a1 1 0 01-1-1V11a1 1 0 011-1h8a1 1 0 011 1v.333a1 1 0 01-1 1z"
          opacity={0.5}
        />
        <path
          data-name="c1/text-column"
          d="M1 17a1 1 0 01-1-1v-.428a1 1 0 011-1h7.778a1 1 0 011 1V16a1 1 0 01-1 1zm0-4.856a1 1 0 01-1-1v-.429a1 1 0 011-1h7.778a1 1 0 011 1v.429a1 1 0 01-1 1zm12.222-4.858a1 1 0 01-1-1v-.429a1 1 0 011-1H21a1 1 0 011 1v.428a1 1 0 01-1 1zM1 7.286a1 1 0 01-1-1v-.429a1 1 0 011-1h7.778a1 1 0 011 1v.428a1 1 0 01-1 1zm12.222-4.858a1 1 0 01-1-1V1a1 1 0 011-1H21a1 1 0 011 1v.428a1 1 0 01-1 1zM1 2.428a1 1 0 01-1-1V1a1 1 0 011-1h7.778a1 1 0 011 1v.428a1 1 0 01-1 1z"
        />
      </g>
    </svg>
  );
}

export default SvgHistory;
