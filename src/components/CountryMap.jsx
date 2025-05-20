import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { PiListMagnifyingGlassBold } from "react-icons/pi";
import Map from "./Map";

function CountryMap() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mapCoords, setMapCoords] = useState({ lat: 51.1657, lng: 10.4515 });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  return (
    <div className="bg-[#0439271f] p-25">
      <div>
        <div className="flex items-center justify-between pb-10">
          <h2 className="text-6xl font-bold text-[#043927]">ALL COUNTRIES</h2>
          <NavLink
            to="/countries"
            className="bg-[#043927] rounded-lg p-2 text-lg shadow-lg hover:shadow-white text-white font-bold flex items-center gap-1"
          >
            <PiListMagnifyingGlassBold />
            BACK TO LIST
          </NavLink>
        </div>
        <div className="flex justify-end items-baseline border-40 border-white bg-white rounded-lg shadow-lg">
          <Map center={mapCoords} width="800px" height="500px" />
        </div>
      </div>
      {error && <p>{error}</p>}
      {loading ? (
        <p>LOADING...</p>
      ) : (
        <div>
          {countries.map((country, id) => (
            <div key={id}></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CountryMap;
