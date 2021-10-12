import * as React from "react";

function SvgUsdt(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="2.5em"
      height="2.5em"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#USDT_svg__clip0)" fillRule="evenodd" clipRule="evenodd">
        <path
          d="M7.93 7.064l-2.917 5.723a.105.105 0 00.026.13l7.879 7.052c.022.02.052.031.083.031.03 0 .06-.011.083-.031l7.88-7.052a.105.105 0 00.025-.13L18.07 7.065a.113.113 0 00-.043-.047.124.124 0 00-.064-.017H8.039a.124.124 0 00-.064.017.113.113 0 00-.045.047z"
          fill="#50AF95"
        />
        <path
          d="M14.012 13.375c-.056.004-.349.02-1 .02-.52 0-.887-.014-1.016-.02-2.004-.082-3.5-.408-3.5-.798 0-.39 1.496-.716 3.5-.8v1.274c.13.008.506.03 1.024.03.623 0 .934-.025.99-.03V11.78c2 .083 3.492.409 3.492.798 0 .39-1.492.715-3.492.798h.002zm0-1.728v-1.139h2.79V8.771H9.206v1.737h2.79v1.139c-2.268.097-3.973.517-3.973 1.02 0 .502 1.705.921 3.973 1.019v3.65h2.017v-3.651c2.262-.098 3.965-.517 3.965-1.02 0-.501-1.701-.92-3.965-1.018z"
          fill="#fff"
        />
      </g>
      <defs>
        <clipPath id="USDT_svg__clip0">
          <path fill="#fff" transform="translate(5 7)" d="M0 0h16v13H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgUsdt;
