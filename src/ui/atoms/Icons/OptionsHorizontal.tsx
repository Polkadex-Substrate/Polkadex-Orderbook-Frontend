import { SVGProps } from "react";

export function OptionsHorizontal(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 43 9"
      {...props}>
      <circle cx="4.5" cy="4.5" r="4.5" stroke="none" />
      <circle cx="21.5" cy="4.5" r="4.5" stroke="none" />
      <circle cx="38.5" cy="4.5" r="4.5" stroke="none" />
    </svg>
  );
}
