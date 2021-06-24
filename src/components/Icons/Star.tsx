import * as React from "react";

function SvgStar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 21.725 20.128"
      {...props}
    >
      <g stroke="rgba(0,0,0,0)">
        <path
          data-name="c2/star-filled"
          d="M16.455 15.356a.419.419 0 01.647.236l.6 2.548a1.165 1.165 0 01-.92 1.392 1.261 1.261 0 01-.888-.13l-2.34-1.336a.393.393 0 01-.034-.669z"
          opacity={0.5}
        />
        <path
          data-name="c1/star-filled"
          d="M12.846 15.404l-7.061 4.017a1.245 1.245 0 01-1.62-.432 1.123 1.123 0 01-.141-.851l1.287-5.47-4.4-3.7a1.131 1.131 0 01-.11-1.644 1.234 1.234 0 01.8-.391l5.827-.518L9.746 1.26a1.236 1.236 0 011.597-.6 1.191 1.191 0 01.636.6l2.315 5.15 5.827.518a1.18 1.18 0 011.1 1.267 1.145 1.145 0 01-.35.715l-6.189 5.211-1.835 1.279z"
        />
      </g>
    </svg>
  );
}

export default SvgStar;
