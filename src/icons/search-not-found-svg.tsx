import React from "react";

export default function SearchNotFoundSvg({
  className,
  width = "108",
  height = "109",
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 108 109"
      fill="none"
      {...{ className }}
    >
      <g clipPath="url(#clip0_153_14718)">
        <path
          d="M93.9142 31.4142C94.2893 31.7893 94.5 32.298 94.5 32.8284V97.5C94.5 98.6046 93.6046 99.5 92.5 99.5H15.5C14.3954 99.5 13.5 98.6046 13.5 97.5V11.5C13.5 10.3954 14.3954 9.5 15.5 9.5H71.1716C71.702 9.5 72.2107 9.71071 72.5858 10.0858L93.9142 31.4142Z"
          fill="#ECF1FB"
        />
        <path d="M72 32V9.5L94.5 32H72Z" fill="#D1DBF2" />
      </g>
      <defs>
        <clipPath id="clip0_153_14718">
          <rect width="108" height="108" fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
}
