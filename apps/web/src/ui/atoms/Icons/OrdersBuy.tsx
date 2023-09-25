import * as React from "react";

function SvgOrdersBuy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M15.73 1h-15M15.73 5l-3.973.606-3.3-1.719-3.332 1.719L.73 5"
        stroke="#0CA564"
        strokeWidth={1.5}
      />
      <path d="M15.43 9h-15M15.43 13h-15" stroke="#fff" strokeWidth={1.5} />
    </svg>
  );
}

export default SvgOrdersBuy;
