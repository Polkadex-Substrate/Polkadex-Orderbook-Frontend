import * as React from "react";

function SvgSell(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}
    >
      <g data-name="Group 3508" transform="translate(-.498)">
        <rect
          data-name="Rectangle 440"
          width={20}
          height={20}
          rx={7}
          transform="translate(.498)"
          fill="#e6007a"
        />
        <path d="M9.889 14.587l4.41-1.383.014-.004.008-.003.008-.003.003-.005.009-.004.01-.004.009-.004.033-.011.014-.006.01-.005.003-.007.003-.005.004-.006.004-.007.01-.006a.68.68 0 00.207-.227.664.664 0 00.096-.487l-.999-4.503a.555.555 0 00-.719-.415.679.679 0 00-.45.78l.68 3.072-8.263-4.77a.615.615 0 00-.828.26.614.614 0 00.189.845l8.268 4.774-3.005.936a.678.678 0 00-.45.78.554.554 0 00.72.414z" />
      </g>
    </svg>
  );
}

export default SvgSell;
