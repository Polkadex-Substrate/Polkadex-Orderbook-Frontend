import * as React from "react";

function SvgPrint(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 18 19"
      {...props}>
      <path
        d="M8.75 7.45691V11.9569L10.25 10.4569"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.75 11.9569L7.25 10.4569"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 7.70691V11.4569C16.5 15.2069 15 16.7069 11.25 16.7069H6.75C3 16.7069 1.5 15.2069 1.5 11.4569V6.95691C1.5 3.20691 3 1.70691 6.75 1.70691H10.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 7.70691H13.5C11.25 7.70691 10.5 6.95691 10.5 4.70691V1.70691L16.5 7.70691Z"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgPrint;
