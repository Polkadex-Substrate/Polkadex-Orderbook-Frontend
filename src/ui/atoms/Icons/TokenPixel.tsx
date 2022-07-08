import * as React from "react";

function TokenPixel(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0.6em"
      height="0.6em"
      viewBox="0 0 101 102"
      {...props}>
      <rect x="38" y="25" width="25" height="13" fillOpacity="0.05" />
      <rect
        opacity="0.2"
        x="38"
        y="38"
        width="25"
        height="13"
        transform="rotate(90 38 38)"
        fill="#E6007A"
        stroke="none"
      />
      <rect
        opacity="0.1"
        x="49"
        y="88"
        width="24"
        height="12"
        transform="rotate(-180 49 88)"
        fill="#E6007A"
        stroke="none"
      />
      <rect
        opacity="0.2"
        x="62"
        y="25"
        width="24"
        height="12"
        transform="rotate(-180 62 25)"
        fill="#E6007A"
      />
      <rect
        opacity="0.4"
        x="25"
        y="76"
        width="13"
        height="12"
        transform="rotate(-180 25 76)"
        fill="#E6007A"
        stroke="none"
      />
      <path
        opacity="0.3"
        d="M88.9995 39L88.9995 76.5L76.5 76.5L76.5 89L63 89L63 64L75.5 64L75.5 39L88.9995 39Z"
        fill="#E6007A"
        stroke="none"
      />
      <rect
        x="63"
        y="38"
        width="25"
        height="25"
        transform="rotate(90 63 38)"
        fill="#E6007A"
        stroke="none"
      />
      <rect opacity="0.3" x="63" y="25" width="13" height="13" fill="#E6007A" stroke="none" />
      <rect opacity="0.4" x="63" y="25" width="13" height="13" fill="#E6007A" stroke="none" />
      <path
        d="M0.5 76V26H12.5V13.5H25V0.5H76V13.5H89V26H76V13.5H25V26H12.5V76H0.5Z"
        stroke="none"
      />
      <path
        d="M101 26L101 76L89 76L89 88.5L76.5 88.5L76.5 101.5L25.5 101.5L25.5 88.5L12.5 88.5L12.5 76L25.5 76L25.5 88.5L76.5 88.5L76.5 76L89 76L89 26L101 26Z"
        stroke="none"
      />
    </svg>
  );
}

export default TokenPixel;
