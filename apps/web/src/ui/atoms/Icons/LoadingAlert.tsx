import * as React from "react";

export function LoadingAlert(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
      {...props}>
      <path
        d="M12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12C9.31371 12 12 9.31371 12 6Z"
        fill="#8BA1BE"
        fillOpacity="0.2"
      />
      <circle cx="3" cy="6" r="1" />
      <circle cx="6" cy="6" r="1" />
      <circle cx="9" cy="6" r="1" />
    </svg>
  );
}
