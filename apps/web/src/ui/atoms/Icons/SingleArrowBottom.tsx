import * as React from "react";

function SvgSingleArrowBottom(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 15 19"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7.49773 0.39917C7.91527 0.39917 8.26034 0.709446 8.31495 1.11201L8.32248 1.22392L8.32248 17.719C8.32248 18.1745 7.95322 18.5437 7.49773 18.5437C7.08019 18.5437 6.73511 18.2335 6.6805 17.8309L6.67297 17.719L6.67297 1.22392C6.67297 0.768425 7.04223 0.39917 7.49773 0.39917Z"
      />
      <path
        fill="currentColor"
        d="M13.5381 10.4843C13.8595 10.1615 14.3817 10.1604 14.7045 10.4818C14.9979 10.7739 15.0255 11.2321 14.7866 11.5555L14.707 11.6481L8.08257 18.3012C7.78952 18.5955 7.32973 18.6222 7.00635 18.3815L6.91373 18.3012L0.28821 11.6482C-0.0332087 11.3254 -0.0321275 10.8032 0.290625 10.4818C0.584036 10.1896 1.04228 10.1639 1.36466 10.4042L1.457 10.4842L7.49845 16.55L13.5381 10.4843Z"
      />
    </svg>
  );
}

export default SvgSingleArrowBottom;