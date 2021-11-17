import * as React from "react";

function SvgDeposit(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 13.847 20.868"
      {...props}>
      <path
        data-name="c2/wallet"
        d="M9.025 14.688h1.4a.7.7 0 110 1.4h-1.4a.7.7 0 010-1.4z"
        opacity={0.5}
      />
      <path
        data-name="c1/wallet"
        d="M11.771 20.868H2.077A2.1 2.1 0 010 18.752v-8.463a2.1 2.1 0 012.077-2.115h8.309a2.1 2.1 0 012.077 2.115v.826a2.118 2.118 0 011.385 2v5.642a2.1 2.1 0 01-2.077 2.111zm-9.694-8.463a.7.7 0 00-.692.705v5.642a.7.7 0 00.692.705h9.694a.7.7 0 00.692-.705v-5.641a.7.7 0 00-.692-.705zm0-2.821a.705.705 0 000 1.41h9v-.705a.7.7 0 00-.692-.705z"
      />
      <path
        d="M5.804 3.769V.785a.785.785 0 011.569 0v2.984L8.35 2.63a.785.785 0 111.19 1.019L7.774 5.717a1.533 1.533 0 01-2.371 0L3.638 3.649A.785.785 0 114.832 2.63z"
        fill="#0ca564"
      />
    </svg>
  );
}

export default SvgDeposit;
