import * as React from "react";

function SvgClose(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 10.116 10.116"
      {...props}>
      <path d="M5.058 3.2L7.877.384a1.311 1.311 0 011.855 1.855l-2.82 2.819 2.82 2.819a1.311 1.311 0 01-1.855 1.855l-2.819-2.82-2.819 2.82A1.311 1.311 0 01.384 7.877L3.2 5.058.384 2.239A1.311 1.311 0 012.239.384z" />
    </svg>
  );
}

export default SvgClose;
