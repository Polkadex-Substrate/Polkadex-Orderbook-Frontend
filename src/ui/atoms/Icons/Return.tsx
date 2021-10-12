import * as React from "react";

function SvgReturn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 27 25"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.11898 10.8334L24.6668 10.8334C25.5873 10.8334 26.3335 11.5796 26.3335 12.5C26.3335 13.4205 25.5873 14.1667 24.6668 14.1667L5.11898 14.1667L12.8423 21.4621C13.4972 22.0808 13.4972 23.084 12.8423 23.7027C12.1873 24.3214 11.1253 24.3214 10.4703 23.7027L0.982656 14.7406C-0.327321 13.5032 -0.327321 11.4969 0.982656 10.2595L10.4703 1.2974C11.1253 0.678691 12.1873 0.678692 12.8423 1.2974C13.4972 1.9161 13.4972 2.91922 12.8423 3.53792L5.11898 10.8334Z"
      />
    </svg>
  );
}

export default SvgReturn;
