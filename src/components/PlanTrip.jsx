import { useState } from "react";
import Map from "./Map";
import { NavLink } from "react-router-dom";
import { PiAirplaneTiltBold } from "react-icons/pi";
import Swal from "sweetalert2";

function PlanTrip() {
  const [date, setDate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [preparation, setPreparation] = useState("");
  const [mapCoords, setMapCoords] = useState({ lat: 51.1657, lng: 10.4515 });

  const fetchCoords = async (countryName) => {
    if (!countryName) return null;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?country=${encodeURIComponent(
          countryName
        )}&format=json&limit=1`
      );
      const data = await response.json();
      if (data && data[0]) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
      }
    } catch (e) {}
    return null;
  };

  const handleCountryChange = async (e) => {
    const value = e.target.value;
    setCountry(value);
    if (value.trim() !== "") {
      const coords = await fetchCoords(value);
      if (coords) setMapCoords(coords);
    }
  };

  const handleSubmit = () => {
    if (
      !date ||
      !enddate ||
      !country.trim() ||
      !description.trim() ||
      !preparation.trim()
    ) {
      Swal.fire({
        title: "HOLD ON",
        text: "PLEASE FILL IN ALL FIELDS",
        icon: "warning",
        confirmButtonColor: "#043927",
      });
      return;
    }

    const newTrip = {
      date,
      enddate,
      country,
      description,
      preparation,
      mapCoords,
    };
    const existingTrip = JSON.parse(localStorage.getItem("trip")) || [];
    const matchingDate = existingTrip.some((trip) => trip.date === date);
    if (matchingDate) {
      Swal.fire({
        title: "HOLD ON",
        text: "YOU ALREADY BOOKED A TRIP FOR THIS DATE",
        icon: "warning",
        confirmButtonColor: "#043927",
      });
      return;
    }

    existingTrip.push(newTrip);

    localStorage.setItem("trip", JSON.stringify(existingTrip));

    Swal.fire({
      title: "OH YESSSS",
      text: "THERE IS A NEW TRIP COMING",
      icon: "success",
      confirmButtonColor: "#043927",
    });

    setDate("");
    setEnddate("");
    setCountry("");
    setDescription("");
    setPreparation("");
    setMapCoords({ lat: 51.1657, lng: 10.4515 });
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white bg-[#043927b6] pt-4 sm:pt-10 md:pt-15 lg:pt-25 pl-4 sm:pl-25">
        PLAN YOUR NEXT TRIP
      </h2>
      <div className="flex flex-col lg:flex-row justify-between gap-4 sm:gap-10 p-4 sm:p-25 pt-4 sm:pt-6 md:pt-8 lg:pt-10 bg-[#043927b6] text-white">
        <div className="bg-white border-40 border-white rounded-lg shadow-lg text-[#043927] text-lg sm:text-xl font-semibold p-4 w-full lg:w-auto lg:flex-1">
          <form className="flex flex-col justify-evenly gap-3">
            <label>WHEN DOES YOUR TRIP START?</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-[#043927b6] text-base sm:text-lg p-2 mb-5 border-2 border-[#043927] rounded-lg w-full"
            />
            <label>WHEN DOES YOUR TRIP END?</label>
            <input
              type="date"
              value={enddate}
              onChange={(e) => setEnddate(e.target.value)}
              className="text-[#043927b6] text-base sm:text-lg p-2 mb-5 border-2 border-[#043927] rounded-lg w-full"
            />
            <label>WHICH COUNTRY DO YOU WANT TO VISIT?</label>
            <input
              type="text"
              value={country}
              onChange={handleCountryChange}
              placeholder="type in your destination"
              className="placeholder-[#043927b6] text-[#043927b6] text-base sm:text-lg p-2 mb-5 border-2 border-[#043927] rounded-lg w-full"
            />
            <label>PLACES YOU WANT TO VISIT OR ACTIVITIES?</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="type in your plans"
              className="placeholder-[#043927b6] text-[#043927b6] text-base sm:text-lg p-2 mb-5 border-2 border-[#043927] rounded-lg w-full"
            />
            <label>WHAT DO YOU NEED FOR THIS TRIP?</label>
            <input
              type="text"
              value={preparation}
              onChange={(e) => setPreparation(e.target.value)}
              placeholder="type in what needs to be done in advance"
              className="placeholder-[#043927b6] text-[#043927b6] text-base sm:text-lg p-2 mb-5 border-2 border-[#043927] rounded-lg w-full"
            />
            <div>
              <NavLink to="/trip">
                <button
                  onClick={handleSubmit}
                  className="bg-[#043927] rounded-lg p-2 text-lg shadow-lg hover:shadow-white text-white font-bold flex items-center gap-1"
                >
                  SAVE THIS TRIP
                  <PiAirplaneTiltBold />
                </button>
              </NavLink>
            </div>
          </form>
        </div>
        <div className="bg-white border-40 border-white rounded-lg shadow-lg w-full lg:w-auto lg:flex-1 overflow-hidden h-[400px] lg:h-auto">
          <Map center={mapCoords} width="100%" height="100%" />
        </div>
      </div>
    </div>
  );
}

export default PlanTrip;
