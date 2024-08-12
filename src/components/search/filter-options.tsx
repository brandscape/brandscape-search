import CloseSvg from "@/icons/close-svg";
import { filterOptionState, searchLoadingState } from "@/recoil/search/search-atom";
import { isNull } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

interface ChildProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  targetName: string;
  label: string;
}

function Option({ targetName, label }: ChildProps) {
  const router = useRouter();
  const pathname = usePathname();

  const setFilterOption = useSetRecoilState(filterOptionState);
  const setSearchLoading = useSetRecoilState(searchLoadingState);

  const onRemoveClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const element = document.getElementById(targetName);
      const checkboxAll = document.getElementById("all");

      const params = new URLSearchParams(window.location.search);
      let searchString = "";

      if (element instanceof HTMLInputElement && element.type === "checkbox") {
        element.checked = false;
        setFilterOption((prev) => ({ ...prev, [targetName]: false }));
        checkboxAll instanceof HTMLInputElement &&
          checkboxAll.checked &&
          (checkboxAll.checked = false);

        /** @todo */
        targetName === "application" && (searchString += "&app=false");
        targetName === "publication" && (searchString += "&pub=false");
        targetName === "withdrawal" && (searchString += "&wit=false");
        targetName === "expiration" && (searchString += "&exp=false");
        targetName === "abandonment" && (searchString += "&aba=false");
        targetName === "cancel" && (searchString += "&can=false");
        targetName === "refused" && (searchString += "&ref=false");
        targetName === "registration" && (searchString += "&reg=false");
      } else if (element instanceof HTMLInputElement && element.type === "search") {
        setFilterOption((prev) => ({ ...prev, [targetName]: undefined }));
        targetName === "classification" && params.delete("tc");
        targetName === "similarityCode" && params.delete("sc");
        targetName === "asignProduct" && params.delete("gd");
      }

      router.push(`${pathname}?${params.toString()}${searchString}`);

      setSearchLoading(true);
    },
    [setFilterOption, setSearchLoading, pathname, router, targetName]
  );

  return (
    <div className="flex flex-row flex-nowrap items-center gap-2 rounded-2xl bg-[--color-primary-minor] px-2">
      <span className="text-[--color-primary-normal] font-semibold text-sm tracking-tighter">
        {label}
      </span>
      <button type="button" name={targetName} onClick={onRemoveClick}>
        <CloseSvg />
      </button>
    </div>
  );
}

export default function FilterOptions() {
  const params = useSearchParams();
  const [
    application,
    registration,
    refused,
    expiration,
    withdrawal,
    publication,
    cancel,
    abandonment,
    classification,
    similarityCode,
    asignProduct,
  ] = [
    params.get("app"),
    params.get("reg"),
    params.get("ref"),
    params.get("exp"),
    params.get("wit"),
    params.get("pub"),
    params.get("can"),
    params.get("aba"),
    params.get("tc"),
    params.get("sc"),
    params.get("gd"),
  ];

  return (
    <div className="text-black flex flex-row flex-nowrap gap-3">
      <div>
        <span className="text-base font-bold tracking-tighter">적용 필터</span>
      </div>
      <div className="flex-1 flex flex-row flex-wrap gap-x-1 gap-y-2">
        {isNull(application) && <Option targetName="application" label="출원" />}
        {isNull(publication) && <Option targetName="publication" label="공고" />}
        {isNull(withdrawal) && <Option targetName="withdrawal" label="취하" />}
        {isNull(expiration) && <Option targetName="expiration" label="소멸" />}
        {isNull(abandonment) && <Option targetName="abandonment" label="포기" />}
        {isNull(cancel) && <Option targetName="cancel" label="무효" />}
        {isNull(refused) && <Option targetName="refused" label="거절" />}
        {isNull(registration) && <Option targetName="registration" label="등록" />}
        {classification && (
          <Option targetName="classification" label={classification.replace(/ /g, "+")} />
        )}
        {similarityCode && (
          <Option targetName="similarityCode" label={similarityCode.replace(/ /g, "+")} />
        )}
        {asignProduct && (
          <Option targetName="asignProduct" label={asignProduct.replace(/ /g, "+")} />
        )}
      </div>
    </div>
  );
}
