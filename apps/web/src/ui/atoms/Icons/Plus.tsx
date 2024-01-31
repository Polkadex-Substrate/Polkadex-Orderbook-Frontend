import * as React from "react";

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 15 15"
      {...props}
    >
      <path
        d="M5.80784 15.0799V10.6799C5.80784 10.2106 5.87384 9.82193 6.00584 9.51392C6.1525 9.20593 6.38717 9.00059 6.70984 8.89792L5.80784 8.19392V0.273926H8.55784V15.0799H5.80784ZM0.131836 8.89792V6.34592H14.2118V8.89792H0.131836Z"
        stroke="none"
        fill="currentColor"
      />
    </svg>
  );
}

export default Plus;
