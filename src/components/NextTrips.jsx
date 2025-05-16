import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Map from "./Map";
import { PiAirplaneTiltBold } from "react-icons/pi";

function NextTrips() {
  const [trips, setTrips] = useState([]);
  const [mapCoords, setMapCoords] = useState({ lat: 51.1657, lng: 10.4515 });

  useEffect(() => {
    const nextTrips = JSON.parse(localStorage.getItem("trip")) || [];
    setTrips(nextTrips);
  }, []);
  console.log(trips);
  

  return (
    <div>
      <h2 className="text-6xl font-bold text-white bg-[#043927b6] pt-25 pl-25">
        YOUR NEXT TRIPS
      </h2>
      <div className="grid grid-cols-2 gap-20 p-25 pt-10 bg-[#043927b6] text-white">
      {trips.length === 0 ? (
        <p><NavLink to="trip">NO TRIPS PLANNED YET.<br></br>PLAN YOUR NEXT TRIP HERE</NavLink></p>
      ) : (
        trips.map((trip, id) => (
          <div key={id} className="p-10 border-10 rounded-lg shadow-lg bg-white text-[#043927]">
            <h3 className="flex gap-2 items-center text-3xl pb-2 font-semibold uppercase">{trip.country}<PiAirplaneTiltBold /></h3>
            <p>FROM {trip.date}</p>
            <p>TO {trip.enddate}</p>
            <p>{trip.description}</p>
            <p>{trip.preparation}</p>
            <div className="w-100 h-100">
            <Map center={mapCoords} />
            </div>
          </div>
        ))
      )}
    </div>
    </div>
  );
}

export default NextTrips;
