import * as React from "react";

function SvgAttention(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 5 28"
      fill="none"
      {...props}>
      <rect opacity="0.4" y="23.3334" width="4.66667" height="4.66667" rx="0.4" />
      <rect width="4.66667" height="21" rx="0.4" />
    </svg>
  );
}

export default SvgAttention;
