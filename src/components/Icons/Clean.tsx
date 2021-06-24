import * as React from "react";

function SvgClean(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 12 15"
      {...props}
    >
      <g>
        <path
          data-name="c2/mop"
          d="M4.677 7.5a1 1 0 11-1 1 1 1 0 011-1z"
          opacity={0.6}
        />
        <path
          data-name="c1/mop"
          d="M11.25 15H4.875A4.88 4.88 0 010 10.125V9.75a4.516 4.516 0 012.25-3.9V4.5A1.5 1.5 0 013.75 3V.75a.75.75 0 111.5 0V3a1.5 1.5 0 011.5 1.5v1.352A4.515 4.515 0 019 9.75v1.5a2.253 2.253 0 002.25 2.25.75.75 0 010 1.5zM4.5 9.75a.751.751 0 01.75.751 3 3 0 003 3 3.718 3.718 0 01-.75-2.25V9.75a3 3 0 00-6 0v.375A3.379 3.379 0 004.875 13.5H4.9a4.49 4.49 0 01-1.145-3 .751.751 0 01.745-.75zM3.9 4.5a.15.15 0 00-.15.15v.45a.15.15 0 00.15.15h1.2a.15.15 0 00.15-.15v-.45a.15.15 0 00-.15-.15z"
        />
      </g>
    </svg>
  );
}

export default SvgClean;
