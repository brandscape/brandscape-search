export default function SearchInput() {
  return (
    <>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-[--color-text-inverse]"
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
        </div>
        <input
          type="search"
          name="default-search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-[--color-text-inverse] rounded-lg bg-[#FFFFFF]/50 focus:ring-blue-500 placeholder:text-[--color-text-inverse] outline-none"
          placeholder="상표 또는 출원/등록번호를 입력하세요"
          required
        />
      </div>
    </>
  );
}
