import React from "react";

export default function DateSvg({
  className,
  width = "1.0625rem",
  height = "1rem",
  transform,
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 17 16"
      fill="none"
      {...{ className, transform }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.1654 2.66665H5.83203V1.33331H4.4987V2.66665H3.16536C2.42898 2.66665 1.83203 3.2636 1.83203 3.99998V13.3333C1.83203 14.0697 2.42899 14.6666 3.16536 14.6666H13.832C14.5684 14.6666 15.1654 14.0697 15.1654 13.3333V3.99998C15.1654 3.2636 14.5684 2.66665 13.832 2.66665H12.4987V1.33331H11.1654V2.66665ZM4.4987 4.66665V3.99998H3.16536V5.99998H13.832V3.99998H12.4987V4.66665H11.1654V3.99998H5.83203V4.66665H4.4987ZM13.832 7.33331V13.3333H3.16536V7.33331H13.832Z"
        fill="#474A4E"
      />
    </svg>
  );
}
