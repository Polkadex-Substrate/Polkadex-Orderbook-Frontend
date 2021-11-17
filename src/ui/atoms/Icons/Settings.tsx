import * as React from "react";

function SvgSettings(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 17 17"
      {...props}>
      <g>
        <path
          data-name="c2/filter-01"
          d="M8.5 17a.843.843 0 01-.833-.85v-1a2.568 2.568 0 010-4.81V.85a.833.833 0 111.666 0v9.5a2.568 2.568 0 010 4.81v1A.843.843 0 018.5 17zm0-5.1a.85.85 0 10.833.85.843.843 0 00-.833-.85z"
          opacity={0.5}
        />
        <path
          data-name="c1/filter-01"
          d="M14.45 17a.851.851 0 01-.85-.85V7.5a2.551 2.551 0 010-4.81V.85a.85.85 0 111.7 0V2.7a2.551 2.551 0 010 4.81v8.64a.851.851 0 01-.85.85zm0-12.75a.85.85 0 10.85.85.851.851 0 00-.85-.85zM2.55 17a.851.851 0 01-.85-.85v-6.095a2.552 2.552 0 010-4.81V.85a.85.85 0 111.7 0v4.395a2.551 2.551 0 010 4.81v6.095a.851.851 0 01-.85.85zm0-10.2a.85.85 0 10.85.85.851.851 0 00-.85-.85z"
        />
      </g>
    </svg>
  );
}

export default SvgSettings;
