import * as React from "react";

function SvgConnection(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 13 14"
      {...props}>
      <rect x="10" width="3" height="14" stroke="none" />
      <rect x="5" y="4" width="3" height="10" stroke="none" />
      <rect y="8" width="3" height="6" stroke="none" />
    </svg>
  );
}

export default SvgConnection;
