"use client";

import { ComponentProps } from "react";

const Keyboard = (props: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="3rem"
      height="3rem"
      viewBox="0 0 24 30"
      {...props}
    >
      <rect
        x="0"
        y="10"
        width="4"
        height="10"
        stroke="none"
        fill="#E6007A"
        opacity="0.2"
      >
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="0.2; 1; .2"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="height"
          attributeType="XML"
          values="10; 20; 10"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="10; 5; 10"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="8"
        y="10"
        width="4"
        height="10"
        stroke="none"
        fill="#E6007A"
        opacity="0.2"
      >
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="0.2; 1; .2"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="height"
          attributeType="XML"
          values="10; 20; 10"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="10; 5; 10"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="16"
        y="10"
        width="4"
        height="10"
        stroke="none"
        fill="#E6007A"
        opacity="0.2"
      >
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="0.2; 1; .2"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="height"
          attributeType="XML"
          values="10; 20; 10"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="10; 5; 10"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
};

const PulseRing = (props: ComponentProps<"svg">) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" {...props}>
      <circle
        fill="none"
        stroke-opacity="1"
        stroke="currentColor"
        stroke-width=".5"
        cx="100"
        cy="100"
        r="0"
      >
        <animate
          attributeName="r"
          calcMode="spline"
          dur="2"
          values="1;80"
          keyTimes="0;1"
          keySplines="0 .2 .5 1"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="stroke-width"
          calcMode="spline"
          dur="2"
          values="0;25"
          keyTimes="0;1"
          keySplines="0 .2 .5 1"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="stroke-opacity"
          calcMode="spline"
          dur="2"
          values="1;0"
          keyTimes="0;1"
          keySplines="0 .2 .5 1"
          repeatCount="indefinite"
        ></animate>
      </circle>
    </svg>
  );
};

const Loading = (props: ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 105 105"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-transparent animate-spin fill-primary-base"
    {...props}
  >
    <circle
      cx="52.5"
      cy="52.5"
      r="50.5"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <path
      d="M103 54.5C103 47.6056 101.642 40.7787 99.0037 34.4091C96.3653 28.0395 92.4982 22.252 87.6231 17.3769C82.748 12.5018 76.9605 8.6347 70.5909 5.99632C64.2213 3.35795 57.3944 2 50.5 2"
      stroke="url(#paint0_linear_4039_33995)"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <defs>
      <linearGradient
        id="paint0_linear_4039_33995"
        x1="103"
        y1="46.5"
        x2="53.5"
        y2="-3"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E6007A" />
        <stop offset="1" stopColor="#E6007A" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);
const Spinner = {
  Keyboard,
  Loading,
  PulseRing,
};

export { Spinner };
