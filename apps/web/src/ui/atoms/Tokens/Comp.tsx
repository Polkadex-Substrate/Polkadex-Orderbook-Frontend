import * as React from "react";

function SvgComp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.51 17.359a1.309 1.309 0 01-.626-1.116v-2.54a.545.545 0 01.821-.47l5.732 3.342c.335.195.542.554.542.942v2.632a.653.653 0 01-.996.559l-5.473-3.35zm8.544-4.822c.335.195.54.555.542.943v5.34a.434.434 0 01-.223.38l-1.254.706a.219.219 0 01-.05.02v-2.965c0-.383-.202-.74-.532-.937l-5.034-3.011V9.665a.545.545 0 01.822-.47l5.729 3.342zm2.509-3.944c.336.195.543.555.543.944v7.8a.442.442 0 01-.23.383l-1.19.642v-5.43c0-.383-.201-.738-.529-.936L12.012 8.91V5.736a.547.547 0 01.819-.472l5.732 3.329z"
        fill="#00D395"
      />
    </svg>
  );
}

export default SvgComp;
