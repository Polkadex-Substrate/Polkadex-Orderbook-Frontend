import * as React from "react";

function SvgWallet(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 23 21"
      {...props}
    >
      <g>
        <path
          data-name="c2/wallet"
          d="M15.578 11.254h2.428a1.214 1.214 0 010 2.428h-2.428a1.214 1.214 0 010-2.428z"
          opacity={0.5}
        />
        <path
          data-name="c1/wallet"
          d="M19.55 21H3.45A3.479 3.479 0 010 17.5v-14A3.479 3.479 0 013.45 0h13.8a3.479 3.479 0 013.45 3.5v1.366a3.5 3.5 0 012.3 3.3V17.5a3.479 3.479 0 01-3.45 3.5zM3.45 7A1.16 1.16 0 002.3 8.167V17.5a1.16 1.16 0 001.15 1.167h16.1A1.16 1.16 0 0020.7 17.5V8.167A1.16 1.16 0 0019.55 7zm0-4.667a1.167 1.167 0 000 2.333H18.4V3.5a1.16 1.16 0 00-1.15-1.167z"
        />
      </g>
    </svg>
  );
}

export default SvgWallet;
