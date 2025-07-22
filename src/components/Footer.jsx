import { FaRegHandPeace } from "react-icons/fa6";

function Footer() {
  return (
    <div className="flex items-center gap-2 justify-center bg-[#043927] border-t-10 border-white text-white text-base sm:text-lg md:text-xl font-bold p-4 sm:p-6 md:p-8 text-center">
      HAVE A GOOD TRIP
      <FaRegHandPeace className="text-base sm:text-lg md:text-xl" />
    </div>
  );
}

export default Footer;
