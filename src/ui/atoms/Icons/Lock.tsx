import * as React from "react";

function SvgLock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 18 21"
      {...props}>
      <path
        d="M13.4709 7.40335V5.25435C13.4399 2.73535 11.3719 0.719353 8.85385 0.750353C6.38685 0.781353 4.39185 2.76735 4.34985 5.23435V7.40335"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        strokeLinejoin="round"
      />
      <path
        d="M8.91028 12.1562V14.3772"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.91024 6.82422C3.16524 6.82422 1.25024 8.39222 1.25024 13.0952C1.25024 17.7992 3.16524 19.3672 8.91024 19.3672C14.6552 19.3672 16.5712 17.7992 16.5712 13.0952C16.5712 8.39222 14.6552 6.82422 8.91024 6.82422Z"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgLock;
