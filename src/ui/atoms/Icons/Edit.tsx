import * as React from "react";

function SvgEdit(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.931 17.5H.75a.751.751 0 01-.75-.75v-4.182c0-.199.08-.39.22-.53L11.461.8a2.721 2.721 0 013.848 0L16.7 2.19a2.72 2.72 0 010 3.848L5.462 17.28a.746.746 0 01-.531.22zm8.454-16a1.213 1.213 0 00-.864.358L1.5 12.879V16h3.12L15.642 4.979a1.223 1.223 0 000-1.727l-1.393-1.395a1.213 1.213 0 00-.864-.357z"
        fill="#fff"
      />
      <path
        opacity={0.5}
        d="M7.946 4.559l4.636 4.584 1.064-1.061-4.639-4.584-1.061 1.061z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgEdit;
