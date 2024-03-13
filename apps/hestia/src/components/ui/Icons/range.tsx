import { ComponentProps } from "react";

export function Range(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 8" {...props}>
      <path
        d="M2.19995 6C3.30452 6 4.19995 5.10457 4.19995 4C4.19995 2.89543 3.30452 2 2.19995 2C1.09538 2 0.199951 2.89543 0.199951 4C0.199951 5.10457 1.09538 6 2.19995 6Z"
        fill="#575A60"
      />
      <path
        opacity="0.4"
        d="M23.2 6C24.3045 6 25.2 5.10457 25.2 4C25.2 2.89543 24.3045 2 23.2 2C22.0954 2 21.2 2.89543 21.2 4C21.2 5.10457 22.0954 6 23.2 6Z"
        fill="#575A60"
      />
      <path
        d="M3.19995 4L22.2 4"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.19995 4L14.2 4"
        stroke="#575A60"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.2 8C15.4091 8 17.2 6.20914 17.2 4C17.2 1.79086 15.4091 0 13.2 0C10.9908 0 9.19995 1.79086 9.19995 4C9.19995 6.20914 10.9908 8 13.2 8Z"
        fill="#575A60"
      />
    </svg>
  );
}
