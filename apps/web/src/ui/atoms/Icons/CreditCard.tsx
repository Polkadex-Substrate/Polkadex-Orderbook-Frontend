import * as React from "react";

function SvgCreditCard(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 19"
      {...props}>
      <mask
        id="mask0_1_21972"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="19">
        <path
          stroke="none"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.9098 0L19.9098 18.1647L-1.03307e-05 18.1647L-9.53674e-06 -8.70285e-07L19.9098 0Z"
        />
      </mask>
      <g mask="url(#mask0_1_21972)">
        <path
          stroke="none"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.41 12.9088L18.406 5.21976C18.392 2.89176 16.952 1.49976 14.553 1.49976L5.35703 1.49976C2.94203 1.49976 1.50003 2.90476 1.50003 5.25576L1.50303 12.9448C1.51703 15.2728 2.95903 16.6648 5.35703 16.6648L14.553 16.6648C16.968 16.6648 18.41 15.2608 18.41 12.9088ZM3.41025e-05 5.25675C3.42399e-05 2.11275 2.15303 -0.000244917 5.35703 -0.000244777L14.553 -0.000244375C17.786 -0.000244233 19.887 2.04676 19.906 5.21476L19.91 12.9078L19.91 12.9088C19.91 16.0528 17.757 18.1648 14.553 18.1648L5.35703 18.1648C2.12503 18.1648 0.0230343 16.1178 0.00303403 12.9498L3.41025e-05 5.25675Z"
        />
        <path
          stroke="none"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.910034 5L18.91 5L18.91 6.5L0.910034 6.5L0.910034 5Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.66004 8L5.41504 8C5.82904 8 6.16504 8.336 6.16504 8.75C6.16504 9.164 5.82904 9.5 5.41504 9.5L2.66004 9.5C2.24604 9.5 1.91004 9.164 1.91004 8.75C1.91004 8.336 2.24604 8 2.66004 8Z"
        />
      </g>
    </svg>
  );
}

export default SvgCreditCard;
