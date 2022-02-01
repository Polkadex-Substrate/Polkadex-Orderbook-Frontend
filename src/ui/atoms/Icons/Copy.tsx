import * as React from "react";

function SvgCopy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 21 22"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.62408 1H10.5933C12.5948 1 14.2174 2.86706 14.2174 5.1701V10.8734C14.2174 13.1764 12.5948 15.0435 10.5933 15.0435H4.62408C2.62259 15.0435 1 13.1764 1 10.8734V5.1701C1 2.86706 2.62259 1 4.62408 1Z"
        strokeWidth="1.23913"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M14.2174 6.78271H16.3759C18.3774 6.78271 20 8.64977 20 10.9528V16.6561C20 18.9591 18.3774 20.8262 16.3759 20.8262H10.4067C8.40518 20.8262 6.78259 18.9591 6.78259 16.6561V15.0436"
        strokeWidth="1.23913"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default SvgCopy;
