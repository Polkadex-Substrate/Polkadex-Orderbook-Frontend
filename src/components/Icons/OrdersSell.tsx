import * as React from "react";

function SvgOrdersSell(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M.73 13h15" stroke="#E6007A" strokeWidth={1.5} />
      <path d="M.73 5h15M.73 1h15" stroke="#fff" strokeWidth={1.5} />
      <path
        d="M.562 7.381l3.377.121 2.284 1.5H11.3l4.415 1.826"
        stroke="#E6007A"
        strokeWidth={1.5}
      />
    </svg>
  );
}

export default SvgOrdersSell;
