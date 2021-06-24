import * as React from "react";

function SvgOrdersAll(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M.73 5h15" stroke="#0CA564" strokeWidth={1.5} />
      <path d="M.73 9h15" stroke="#E6007A" strokeWidth={1.5} />
      <path d="M.73 1h15" stroke="#0CA564" strokeWidth={1.5} />
    </svg>
  );
}

export default SvgOrdersAll;
