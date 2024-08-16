import Image from "next/image";
import Logo from "../../public/images/brandscape-main-logo.png";

export default function Footer() {
  return (
    <footer className="footer text-white bg-[--color-primary-most] w-full tracking-tighter pb-5">
      <div className="max-w-[60rem] m-auto p-5 flex flex-col flex-nowrap gap-2">
        <Image className="mb-2" src={Logo} alt="logo-image" width={150} />
        <div className="font-medium">
          <p>상호명 : 브랜드스케이프(Brandscape)</p>
          <p>대표 : 김지현</p>
        </div>
        <div className="font-normal text-[--color-text-minor]">
          <p>사업자등록번호 : 166-23-01860</p>
          <p>email : ip@brandscape.co.kr</p>
          <p>주소 : 서울특별시 중구 을지로 264, 12층</p>
        </div>
        <div className="font-normal text-[--color-text-minor]">
          <p>Copyrights © 2024 by BRANDSCAPE. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
