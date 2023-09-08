import * as React from "react";

function SvgBuy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}>
      <g data-name="Group 3508" transform="translate(-.498)">
        <rect
          data-name="Rectangle 440"
          width={20}
          height={20}
          rx={7}
          transform="translate(.498)"
          fill="#0ca564"
        />
        <path d="M9.89 5.146l4.409 1.382.014.004.015.006.007.002.003.005.013.001.015.007.013.006.014.007.014.005.012.009.004.007.003.005.004.006.004.007.009.006a.68.68 0 01.23.221.664.664 0 01.073.494l-1.003 4.494a.555.555 0 01-.72.415.679.679 0 01-.45-.78l.685-3.065-8.263 4.77a.615.615 0 01-.828-.26.614.614 0 01.19-.845l8.266-4.773-3.005-.94a.678.678 0 01-.45-.779.554.554 0 01.719-.415z" />
      </g>
    </svg>
  );
}

export default SvgBuy;
