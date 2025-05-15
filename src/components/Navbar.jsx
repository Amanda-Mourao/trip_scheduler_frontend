import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[#292524] text-white font-bold p-10 flex justify-between">
      <h1 className="text-7xl">TRIP SCHEDULER</h1>
      <ul>
        <NavLink to="/" className="hover:underline">
          <li className="flex items-center gap-2">HOME</li>
        </NavLink>
        <NavLink to="countries" className="hover:underline">
          <li className="flex items-center gap-2">CHOOSE A COUNTRY</li>
        </NavLink>
        <NavLink to="trip" className="hover:underline">
          <li className="flex items-center gap-2">PLAN YOUR NEXT TRIP</li>
        </NavLink>
      </ul>
    </nav>
  );
}

export default Navbar;
