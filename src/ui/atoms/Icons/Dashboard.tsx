import * as React from "react";

function SvgDashboard(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}
    >
      <g>
        <path
          data-name="c2/pie-chart-02"
          d="M13.87 9l3.038-3.037a7.945 7.945 0 01.83 2L16.7 9zM11 3.385l1.105-1.105a7.953 7.953 0 011.985.843L11 6.213z"
          opacity={0.5}
        />
        <path
          data-name="c1/pie-chart-02"
          d="M10 20a10 10 0 1110-10 10.011 10.011 0 01-10 10zM9 2.062A8 8 0 1017.938 11H11a2 2 0 01-2-2zm7.338 3.055L12.454 9h5.484a8.121 8.121 0 00-.2-1.039 7.949 7.949 0 00-.831-2 8.058 8.058 0 00-.57-.845zM11 2.062v5.566L14.929 3.7a8.163 8.163 0 00-.839-.575A7.946 7.946 0 0011 2.062z"
        />
      </g>
    </svg>
  );
}

export default SvgDashboard;
