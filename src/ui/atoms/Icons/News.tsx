import * as React from "react";

function SvgNews(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 16"
      {...props}>
      <path
        data-name="Path 8116"
        d="M18 0v1.2L2 4.754V4H0v8h2v-.754l1 .223 8.27 1.838L18 14.8V16h2V0zM5 11.912l4.127.918zM2 9.2V6.8l16-3.554v9.508z"
      />
    </svg>
  );
}

export default SvgNews;
