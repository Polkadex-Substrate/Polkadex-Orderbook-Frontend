import * as React from "react";

export function Area(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 29 29"
      {...props}
    >
      <path
        d="M1 1.79999V27.8C1 27.9104 1.08954 28 1.2 28H27.2"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M26.5562 9.77862L19.4851 16.8497C19.0946 17.2402 18.4614 17.2402 18.0709 16.8497L14.0853 12.8641C13.6948 12.4735 13.0616 12.4735 12.6711 12.8641L5.59999 19.9351"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
