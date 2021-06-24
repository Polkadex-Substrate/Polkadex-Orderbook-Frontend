import * as React from "react";

function SvgExchangeBuy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.673 7.77L.431 4.529l-.01-.011-.01-.011-.006-.006-.01-.012-.01-.012-.01-.012-.009-.015-.008-.009-.005-.012V4.403l-.03-.02a.608.608 0 01.12-.726L3.673.428a.608.608 0 01.86.86l-2.2 2.2h9.877a.608.608 0 010 1.216H2.328l2.2 2.2a.608.608 0 01-.859.859l.004.007z"
        fill="#24BA7B"
      />
      <path
        d="M15.876 4.48l3.242 3.241.011.011.01.011.005.006.011.012.01.012.01.012.008.015.008.009.005.012V7.847l.03.02a.608.608 0 01-.12.726l-3.23 3.229a.608.608 0 01-.859-.86l2.2-2.2H7.34a.608.608 0 010-1.216h9.881l-2.2-2.2a.607.607 0 01.86-.859l-.005-.007z"
        fill="#8BA1BE"
        fillOpacity={0.2}
      />
    </svg>
  );
}

export default SvgExchangeBuy;
