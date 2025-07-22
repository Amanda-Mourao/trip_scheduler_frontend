import { NavLink } from "react-router-dom";
import { TbWorldHeart } from "react-icons/tb";
import { PiAirplaneTiltBold } from "react-icons/pi";
import { AiOutlineSchedule } from "react-icons/ai";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative bg-[#043927] border-b-10 border-white text-white font-bold p-4 md:p-15 flex justify-between items-center z-50">
      <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-8xl">
        TRIP SCHEDULER
      </h1>

      <ul className="hidden md:block">
        <NavLink to="/" className="hover:underline">
          <li className="flex items-center gap-2 text-sm md:text-base lg:text-lg">
            <AiOutlineSchedule />
            TRIP SCHEDULER
          </li>
        </NavLink>
        <NavLink to="countries" className="hover:underline">
          <li className="flex items-center gap-2 text-sm md:text-base lg:text-lg">
            <TbWorldHeart />
            CHOOSE A COUNTRY
          </li>
        </NavLink>
        <NavLink to="trip" className="hover:underline">
          <li className="flex items-center gap-2 text-sm md:text-base lg:text-lg">
            <PiAirplaneTiltBold />
            PLAN YOUR NEXT TRIP
          </li>
        </NavLink>
      </ul>

      <button
        className="md:hidden text-xl sm:text-2xl z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#043927] md:hidden z-40 border-t-2 border-white">
          <ul className="flex flex-col p-4">
            <NavLink
              to="/"
              className="hover:underline border-b border-white border-opacity-20 py-2"
              onClick={() => setIsOpen(false)}
            >
              <li className="flex items-center gap-2 text-base sm:text-lg py-2">
                <AiOutlineSchedule />
                TRIP SCHEDULER
              </li>
            </NavLink>
            <NavLink
              to="countries"
              className="hover:underline border-b border-white border-opacity-20 py-2"
              onClick={() => setIsOpen(false)}
            >
              <li className="flex items-center gap-2 text-base sm:text-lg py-2">
                <TbWorldHeart />
                CHOOSE A COUNTRY
              </li>
            </NavLink>
            <NavLink
              to="trip"
              className="hover:underline py-2"
              onClick={() => setIsOpen(false)}
            >
              <li className="flex items-center gap-2 text-base sm:text-lg py-2">
                <PiAirplaneTiltBold />
                PLAN YOUR NEXT TRIP
              </li>
            </NavLink>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
