import * as React from "react";

function SvgEth(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="2em"
      height="2em"
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <g>
        <path
          d="M4.95242 0.461426L4.85254 0.800904V10.6518L4.95242 10.7515L9.52509 8.0486L4.95242 0.461426Z"
          stroke="none"
        />
        <path
          d="M4.95353 0.461426L0.380859 8.0486L4.95353 10.7515V5.9702V0.461426Z"
          stroke="none"
        />
        <path
          d="M4.95277 12.2391L4.89648 12.3077V15.8168L4.95277 15.9812L9.52819 9.5376L4.95277 12.2391Z"
          stroke="none"
        />
        <path d="M4.95353 15.9813V12.2391L0.380859 9.5376L4.95353 15.9813Z" stroke="none" />
        <path d="M4.95312 10.7515L9.52573 8.04861L4.95312 5.97021V10.7515Z" stroke="none" />
        <path d="M0.380859 8.04861L4.95346 10.7515V5.97021L0.380859 8.04861Z" stroke="none" />
      </g>
    </svg>
  );
}

export default SvgEth;
