import React from "react";

export default function CloseSvg({
  className,
  width = "0.75rem",
  height = "0.75rem",
  transform,
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      {...{ className, transform }}
    >
      <g clipPath="url(#clip0_309_11565)">
        <path
          d="M1.42129 0.833313L0.832031 1.42257L4.40964 5.00018L0.832031 8.5778L1.42129 9.16705L4.9989 5.58944L8.57651 9.16705L9.16577 8.5778L5.58816 5.00018L9.16577 1.42257L8.57651 0.833313L4.9989 4.41093L1.42129 0.833313Z"
          fill="#2E66D8"
        />
      </g>
      <defs>
        <clipPath id="clip0_309_11565">
          <rect width={width} height={height} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
