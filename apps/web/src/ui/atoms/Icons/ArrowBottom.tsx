import * as React from "react";

function SvgArrowBottom(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 8 5"
      {...props}
    >
      <path
        stroke="none"
        d="M3.60043 3.59975L3.00331 4.19703L3.60052 4.79408L4.19764 4.19695L3.60043 3.59975ZM6.00568 8.59946e-05L3.00322 3.00254L4.19764 4.19695L7.20009 1.19449L6.00568 8.59946e-05ZM4.19755 3.00246L3.60043 2.40533L1.19424 0L0 1.19457L3.00331 4.19703L4.19755 3.00246Z"
      />
    </svg>
  );
}

export default SvgArrowBottom;
