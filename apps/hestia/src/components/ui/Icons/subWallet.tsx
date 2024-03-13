import { ComponentProps } from "react";

export function SubWallet(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41" {...props}>
      <rect width="41" height="41" rx="20.5" fill="#1C1C26" />
      <path
        d="M28.127 17.338V14.1661L15.4131 9.07129L12.873 10.3599L12.8864 20.2323L22.3984 24.0583L17.3182 26.2192V24.5482L14.9858 23.6024L12.8864 24.5936V30.6399L15.4153 31.9285L28.127 26.1993V22.1354L16.6865 17.561V14.7856L25.7634 18.4085L28.127 17.338Z"
        fill="white"
      />
    </svg>
  );
}
