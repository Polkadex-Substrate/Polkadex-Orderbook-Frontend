import * as React from "react";

export function Apple(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 18 22"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.3062 11.3003C14.335 14.5114 17.096 15.5727 17.1295 15.5844C17.1124 15.6583 16.6974 17.1159 15.6618 18.5953C14.7968 19.898 13.8904 21.1726 12.4507 21.1944C11.0531 21.2255 10.582 20.3667 8.97883 20.3667C7.36006 20.3667 6.8594 21.1726 5.5186 21.2263C4.14743 21.2785 3.0994 19.8372 2.20397 18.5455C0.413125 15.9106 -0.982179 11.1197 0.888089 7.85801C1.79364 6.25793 3.44589 5.22936 5.21182 5.20211C6.58532 5.1733 7.85761 6.1349 8.70164 6.1349C9.52777 6.1349 11.1037 4.98409 12.7272 5.15617C13.4053 5.17719 15.3387 5.42635 16.586 7.25769C16.4848 7.31842 14.2829 8.62263 14.3062 11.3003ZM8.53657 4.91323C8.38318 3.70636 8.9765 2.42317 9.64223 1.64065C10.3944 0.751456 11.7001 0.0701553 12.7443 0.0234375C12.8813 1.27703 12.3861 2.51427 11.6659 3.42216C10.9129 4.31758 9.70997 5.00122 8.53579 4.91323H8.53657Z"
        stroke="none"
      />
    </svg>
  );
}