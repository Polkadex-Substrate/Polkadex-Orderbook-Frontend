import * as React from "react";

function SvgSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20.095 19"
      {...props}>
      <g data-name="Group 3563">
        <path
          data-name="c2/search"
          d="M14.242 15.182a9.292 9.292 0 001.845-1.757l3.626 3.454a1.2 1.2 0 010 1.757 1.351 1.351 0 01-1.845 0l-3.626-3.454z"
        />
        <path
          data-name="c1/search"
          d="M9 18a9 9 0 119-9 9.01 9.01 0 01-9 9zm.111-16a7 7 0 107 7 7.008 7.008 0 00-7-7z"
        />
      </g>
    </svg>
  );
}

export default SvgSearch;
