import * as React from "react";

function SvgPdex(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="2.5em"
      height="2.5em"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.227 17.456v-1.659l-2.841-2.867h-1.712l4.553 4.526zM7 8.772v1.66L9.842 13.3h1.711L7 8.772zM8.493 7h1.658l2.867 2.842L15.86 7h1.734l-4.574 4.553L8.493 7zM8.772 19.088h1.658l2.867-2.841 2.843 2.841h1.734L13.3 14.535l-4.527 4.553z" />
      <path
        d="M13.112 13.826a.796.796 0 100-1.592.796.796 0 000 1.592z"
        fill="#E6007A"
      />
    </svg>
  );
}

export default SvgPdex;
