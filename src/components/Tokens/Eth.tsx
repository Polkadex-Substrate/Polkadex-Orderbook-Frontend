import * as React from "react";

function SvgEth(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="2em"
      height="2em"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g opacity={0.8} fill="#fff">
        <path d="M12.957 6l-.093.315v9.148l.093.092 4.246-2.51L12.957 6z" />
        <path d="M12.957 6L8.71 13.045l4.246 2.51V6zM12.957 16.936l-.053.064v3.259l.053.152 4.248-5.983-4.248 2.508z" />
        <path d="M12.957 20.411v-3.475L8.71 14.428l4.246 5.983zM12.957 15.555l4.246-2.51-4.246-1.93v4.44zM8.71 13.045l4.247 2.51v-4.44l-4.246 1.93z" />
      </g>
    </svg>
  );
}

export default SvgEth;
