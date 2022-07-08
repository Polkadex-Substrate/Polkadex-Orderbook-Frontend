import * as React from "react";

export function SearchPixel(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 204 204"
      {...props}>
      <rect opacity="0.05" width="204" height="204" rx="100" stroke="none" />
      <rect
        opacity="0.2"
        x="99"
        y="73.5"
        width="22"
        height="12"
        transform="rotate(-180 99 73.5)"
        fill="#E6007A"
        stroke="none"
      />
      <rect
        opacity="0.4"
        x="64"
        y="73.5"
        width="13"
        height="13"
        fill="#E6007A"
        stroke="none"
      />
      <rect
        opacity="0.4"
        x="64"
        y="86.5"
        width="13"
        height="25"
        fill="#E6007A"
        stroke="none"
      />
      <path
        d="M39 111.5V61.5H51V49H63.5V36H114.5V49H127.5V61.5H114.5V49H63.5V61.5H51V111.5H39Z"
        stroke="none"
      />
      <path
        d="M139.5 61.5L139.5 111.5L127.5 111.5L127.5 124L115 124L115 137L64 137L64 124L51 124L51 111.5L64 111.5L64 124L115 124L115 111.5L127.5 111.5L127.5 61.5L139.5 61.5Z"
        stroke="none"
      />
      <rect x="126.5" y="126.5" width="13" height="13" stroke="none" />
      <rect x="152.5" y="154.5" width="13" height="13" stroke="none" />
      <rect x="139.5" y="139.5" width="13" height="13" stroke="none" />
    </svg>
  );
}
