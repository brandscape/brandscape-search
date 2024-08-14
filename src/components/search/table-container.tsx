import { useState } from "react";

export default function TableContainer() {
  const [activeTab, setActiveTab] = useState<number>(1);
  return (
    <div className="p-5">
      <div className="tabs">
        <div className="flex justify-center">
          <ul className="flex bg-gray-100 rounded-lg transition-all duration-300 p-0.5 overflow-hidden">
            <li
              className={
                "inline-block py-3 px-6 text-[--color-text-assistive] hover:text-[--color-text-normal] font-semibold text-base whitespace-nowrap cursor-pointer aria-[active=true]:text-[--color-text-normal] aria-[active=true]:bg-white aria-[active=true]:rounded-lg aria-[active=true]:shadow-tab-shadow"
              }
              data-tab={`tabs-1`}
              aria-active={activeTab === 1}
              role="tab"
              onClick={() => setActiveTab(1)}
            >
              모든 상표
            </li>
            <li
              className="inline-block py-3 px-6 text-[--color-text-assistive] hover:text-[--color-text-normal] font-semibold text-base whitespace-nowrap cursor-pointer aria-[active=true]:text-[--color-text-normal] aria-[active=true]:bg-white aria-[active=true]:rounded-lg aria-[active=true]:shadow-tab-shadow"
              data-tab={`tabs-2`}
              aria-active={activeTab === 2}
              role="tab"
              onClick={() => setActiveTab(2)}
            >
              유효한 상표
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
