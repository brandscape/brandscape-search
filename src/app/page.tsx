"use client";

import Image from "next/image";
import Logo from "../../public/images/brandscape-main-logo.png";
import SearchInput from "@/components/SearchInput";
import { BaseSyntheticEvent } from "react";

export default function Home() {
  const onSearchSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const searchInput = e.target["default-search"];

    if (searchInput instanceof HTMLInputElement) {
      /** @todo api test */
      console.log("submit test", searchInput.value);
    }
  };
  return (
    <main className="min-h-screen w-full p-24 xs:px-10 lg:px-[6.5rem] main-background flex items-center justify-center">
      <div className="container flex flex-col flex-nowrap gap-[1.875rem] justify-center items-center">
        <div className="logo">
          <Image src={Logo} alt="logo" width={428} height={90} priority />
        </div>
        <div className="search-container max-w-[34.375rem] w-full h-[3.125rem]">
          <form className="mx-auto h-full" onSubmit={onSearchSubmit}>
            <SearchInput />
          </form>
        </div>
      </div>
    </main>
  );
}
