import * as React from "react";

function SvgLoading(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 27 6"
      {...props}>
      <circle opacity="0.5" cx="3" cy="3" r="3" />
      <circle cx="14" cy="3" r="3" />
      <circle opacity="0.5" cx="24" cy="3" r="3" />
    </svg>
  );
}

export default SvgLoading;
