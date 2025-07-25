import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Map from "./Map";
import { PiAirplaneTiltBold } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import Swal from "sweetalert2";

function NextTrips() {
  const [trips, setTrips] = useState([]);
  const [mapCoords, setMapCoords] = useState({ lat: 51.1657, lng: 10.4515 });

  useEffect(() => {
    const nextTrips = JSON.parse(localStorage.getItem("trip")) || [];
    setTrips(nextTrips);
  }, []);

  function handleDelete(deleteDate) {
    const existingTrips = JSON.parse(localStorage.getItem("trip") || []);
    const updatedTrips = existingTrips.filter(
      (trip) => trip.date !== deleteDate
    );
    localStorage.setItem("trip", JSON.stringify(updatedTrips));
    setTrips(updatedTrips);
    Swal.fire({
      title: "OH NOOO",
      text: "YOU CANCELED YOUR TRIP",
      icon: "error",
      confirmButtonColor: "#043927",
    });
  }

  return (
    <div className="min-h-screen bg-[#043927b6]">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white pt-4 sm:pt-10 md:pt-15 lg:pt-25 pl-4 sm:pl-25">
        YOUR NEXT TRIPS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-20 p-4 sm:p-25 pt-4 sm:pt-6 md:pt-8 lg:pt-10 text-white">
        {trips.length === 0 ? (
          <p className="font-semibold text-xl hover:underline">
            <NavLink to="trip">
              NO TRIPS PLANNED YET.<br></br>PLAN YOUR NEXT TRIP HERE →
            </NavLink>
          </p>
        ) : (
          trips.map((trip, id) => (
            <div
              key={id}
              className="rounded-lg shadow-lg bg-white text-[#043927] font-semibold"
            >
              <div className="overflow-hidden rounded-t-lg ">
                <Map
                  center={trip.mapCoords || mapCoords}
                  width="100%"
                  height="200px"
                />
              </div>
              <div className="p-5">
                <h3 className="flex gap-2 items-center text-xl sm:text-2xl md:text-3xl pb-4 font-semibold uppercase">
                  {trip.country}
                  <PiAirplaneTiltBold />
                </h3>
                <p className="flex items-center gap-2 pb-3 pl-2">
                  <FaCalendarAlt />
                  From {trip.date} to {trip.enddate}
                </p>
                <p className="flex items-center gap-2 pb-3 pl-2">
                  <FaMapLocationDot />
                  {trip.description}
                </p>
                <p className="flex items-center gap-2 pl-2">
                  <FaListCheck />
                  {trip.preparation}
                </p>
              </div>
              <div className="flex justify-end p-5 pt-0">
                <button
                  onClick={() => handleDelete(trip.date)}
                  className="bg-[#043927] rounded-lg p-2 text-lg shadow-lg hover:shadow-white text-white font-bold flex items-center gap-1"
                >
                  CANCEL THIS TRIP
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NextTrips;
