import Image from "next/image";
import Logo from "../../public/images/brandscape-main-logo.png";

export default function Footer() {
  return (
    <footer className="footer text-white bg-[--color-primary-most] w-full tracking-tighter pb-5">
      <div className="max-w-[60rem] m-auto p-5 flex flex-col flex-nowrap gap-2">
        <Image className="mb-2" src={Logo} alt="logo-image" width={150} />
        <div className="font-medium">
          <p></p>
          <p></p>
        </div>
        <div className="font-normal text-[--color-text-minor]">
          <p></p>
          <p>email : ip@brandscape.co.kr</p>
          <p></p>
        </div>
        <div className="font-normal text-[--color-text-minor]">
          <p>Copyrights © 2024 by BRANDSCAPE. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
