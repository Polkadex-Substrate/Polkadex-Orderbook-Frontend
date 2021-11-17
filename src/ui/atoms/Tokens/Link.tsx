import * as React from "react";

function SvgLink(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        clipRule="evenodd"
        d="M13 6l6.062 3.5v7L13 20l-6.062-3.5v-7L13 6z"
        stroke="#224DDA"
        strokeWidth={3}
      />
    </svg>
  );
}

export default SvgLink;
