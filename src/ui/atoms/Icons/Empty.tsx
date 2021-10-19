import * as React from "react";

function SvgEmpty(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="auto"
      viewBox="0 0 303 129"
      {...props}>
      <path
        d="M151.5 129C235.171 129 303 127.209 303 125C303 122.791 235.171 121 151.5 121C67.8289 121 0 122.791 0 125C0 127.209 67.8289 129 151.5 129Z"
        fill="gray"
      />
      <path
        d="M134 123.5C134 123.5 291.965 89.445 186.929 56.6211C57.7971 16.2676 254.235 17.4638 255.859 17.2324"
        stroke="gray"
        strokeWidth="2"
        strokeDasharray="5.22 5.22"
        fill="none"
      />
      <path
        d="M255.326 14.1712L243.55 0L302.546 8.07721L244.673 40.3007L255.326 14.1712Z"
        fill="#E6007A"
      />
      <path
        d="M247.08 21.099L255.968 14.0884L301.26 8.24316L247.08 21.099Z"
        fill="#850046"
      />
    </svg>
  );
}

export default SvgEmpty;
