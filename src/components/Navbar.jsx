import { NavLink } from "react-router-dom";
import { TbWorldHeart } from "react-icons/tb";
import { PiAirplaneTiltBold } from "react-icons/pi";
import { AiOutlineSchedule } from "react-icons/ai";

function Navbar() {
  return (
    <nav className=" bg-[#043927] border-b-10 border-white text-white font-bold p-15 flex justify-between">
      <h1 className="text-8xl">TRIP SCHEDULER</h1>
      <ul>
        <NavLink to="/" className="hover:underline">
          <li className="flex items-center gap-2 text-lg">
            <AiOutlineSchedule />
            TRIP SCHEDULER
          </li>
        </NavLink>
        <NavLink to="countries" className="hover:underline">
          <li className="flex items-center gap-2 text-lg">
            <TbWorldHeart />
            CHOOSE A COUNTRY
          </li>
        </NavLink>
        <NavLink to="trip" className="hover:underline">
          <li className="flex items-center gap-2 text-lg">
            <PiAirplaneTiltBold />
            PLAN YOUR NEXT TRIP
          </li>
        </NavLink>
      </ul>
    </nav>
  );
}

export default Navbar;
