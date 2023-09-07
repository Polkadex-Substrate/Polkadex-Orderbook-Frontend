import * as React from "react";

function DropdownArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 8 13"
      width="1em"
      height="1em"
      {...props}>
      <path d="M1 9L4 12L7 9" fill="none" />
      <path d="M7 4L4 1L1 4" fill="none" />
    </svg>
  );
}

export default DropdownArrow;
