import * as React from "react";

function SvgDocument(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 19 20"
      {...props}>
      <path
        d="M12.7162 14.2234H5.49622"
        stroke="#130F26"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.7162 10.0369H5.49622"
        stroke="#130F26"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.25134 5.86011H5.49634"
        stroke="#130F26"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.9086 0.749756C12.9086 0.749756 5.23161 0.753756 5.21961 0.753756C2.45961 0.770756 0.75061 2.58676 0.75061 5.35676V14.5528C0.75061 17.3368 2.47261 19.1598 5.25661 19.1598C5.25661 19.1598 12.9326 19.1568 12.9456 19.1568C15.7056 19.1398 17.4156 17.3228 17.4156 14.5528V5.35676C17.4156 2.57276 15.6926 0.749756 12.9086 0.749756Z"
        stroke="#130F26"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgDocument;
