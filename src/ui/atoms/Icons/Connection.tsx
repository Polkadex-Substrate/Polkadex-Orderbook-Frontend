import * as React from "react";

function SvgConnection(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 14 19"
      {...props}>
      <path d="M7 17L7 5.5M2 17L2 8M12 17L12 1.5" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default SvgConnection;
