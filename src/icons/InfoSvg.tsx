import React from "react";

export default function InfoSvg({
  className,
  width = "1rem",
  height = "1rem",
  transform,
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 48 48"
      {...{ className, transform }}
    >
      <path
        fill="currentColor"
        d="M24 6.5C14.335 6.5 6.5 14.335 6.5 24S14.335 41.5 24 41.5S41.5 33.665 41.5 24S33.665 6.5 24 6.5M4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24m20-4c.69 0 1.25.56 1.25 1.25v12.5a1.25 1.25 0 1 1-2.5 0v-12.5c0-.69.56-1.25 1.25-1.25m0-3a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
      />
    </svg>
  );
}
