interface Props {
  textColor?: string;
  placeholderColor?: "inverse" | "minor";
  border?: string;
}

export default function SearchInput({
  textColor = "text-[--color-text-inverse]",
  placeholderColor = "inverse",
  border = "",
}: Props) {
  return (
    <>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
      <div className="relative flex flex-row flex-nowrap">
        <input
          type="search"
          name="default-search"
          id="default-search"
          className={`block w-full h-full p-4 text-sm rounded-lg rounded-r-none bg-[#FFFFFF]/50 focus:ring-blue-500 outline-none z-0 border-r-0 ${textColor} ${border} ${
            placeholderColor === "minor"
              ? "placeholder:text-[color-text-minor]"
              : "placeholder:text-[--color-text-inverse]"
          }`}
          placeholder="상표 또는 출원번호를 입력하세요"
        />
        <button
          type="submit"
          className={`p-4 rounded-lg rounded-l-none bg-[#FFFFFF]/50 focus:ring-blue-500 outline-none border-l-0 ${textColor} ${border}`}
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
        {/* <div
          className={`absolute inset-y-0 start-0 flex items-center pe-3 cursor-pointer pointer-events-none ${textColor}`}
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div> */}
      </div>
    </>
  );
}
