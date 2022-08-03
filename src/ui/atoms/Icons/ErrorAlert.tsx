import * as React from "react";

export function ErrorAlert(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
      {...props}>
      <path
        d="M12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12C9.31371 12 12 9.31371 12 6Z"
        fill="#E6007A"
      />
      <path
        d="M6.04545 5.45455L7.14773 4H8.29545L6.46591 6.15311L6.04545 5.45455ZM8.5 8H7.11364L3.5 4H4.90909L8.5 8ZM5.92045 6.54545L4.70455 8H3.55682L5.375 5.90431L5.92045 6.54545Z"
        fill="white"
      />
    </svg>
  );
}
