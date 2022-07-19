import * as React from "react";

function SvgGraph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 25 24"
      {...props}>
      <path
        d="M2.49609 22H22.4961"
        fill="none"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2461 4V22H14.7461V4C14.7461 2.9 14.2961 2 12.9461 2H12.0461C10.6961 2 10.2461 2.9 10.2461 4Z"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.49609 10V22H7.49609V10C7.49609 8.9 7.09609 8 5.89609 8H5.09609C3.89609 8 3.49609 8.9 3.49609 10Z"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.4961 15V22H21.4961V15C21.4961 13.9 21.0961 13 19.8961 13H19.0961C17.8961 13 17.4961 13.9 17.4961 15Z"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgGraph;
