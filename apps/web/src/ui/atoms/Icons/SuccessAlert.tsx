import * as React from "react";

export function SuccessAlert(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
      {...props}>
      <path
        d="M12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12C9.31371 12 12 9.31371 12 6Z"
        fill="#02C076"
      />
      <path d="M4 5.17949L6.10526 7L9 4" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}
