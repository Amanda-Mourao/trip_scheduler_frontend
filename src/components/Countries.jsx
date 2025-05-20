import axios from "axios";
import { useEffect, useState } from "react";
import { PiCityFill } from "react-icons/pi";
import { FaLanguage } from "react-icons/fa6";
import { PiMapPinAreaBold } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbWorldLatitude } from "react-icons/tb";
import { TbWorldLongitude } from "react-icons/tb";
import { TbTimezone } from "react-icons/tb";
import { PiCarProfileBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { TbWorldSearch } from "react-icons/tb";
import { BsCurrencyExchange } from "react-icons/bs";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    <div className="bg-[#0439271f]">
      <div className="flex items-center justify-between pt-25 pl-25 pr-25">
        <h2 className="text-6xl font-bold text-[#043927]">ALL COUNTRIES</h2>
        <NavLink
          to="map"
          className="bg-[#043927] rounded-lg p-2 text-lg shadow-lg hover:shadow-white text-white font-bold flex items-center gap-1"
        >
          <TbWorldSearch />
          SEARCH ON MAP
        </NavLink>
      </div>
      {error && <p>{error}</p>}
      {loading ? (
        <p>LOADING...</p>
      ) : (
        <div className="grid grid-cols-3 gap-20 pt-10 p-25">
          {countries.map((country, id) => (
            <div
              key={id}
              className="bg-white text-[#043927] rounded-lg shadow-lg font-semibold p-5"
            >
              <h3 className="text-4xl font-semibold uppercase flex items-baseline justify-between">
                {country.name.common}
                <img
                  src={country.flags?.png}
                  className="h-10 w-15 border-1 border-gray-300"
                />
              </h3>
              <p className="pb-4 text-2xl font-semibold">
                Located in {country.continents}
              </p>
              <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold">
                <PiCityFill />
                Capital City: {country.capital}
              </p>
              <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold">
                <FaLanguage />
                Languages:{" "}
                {country.languages
                  ? Object.values(country.languages).slice(0, 2).join(", ")
                  : "N/A"}
              </p>
              <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold">
                <PiMapPinAreaBold />
                Area: {country.area} km²
              </p>
              <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold">
                <FaPeopleGroup />
                Population: {country.population}
              </p>
              <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold">
                <TbWorldLatitude />
                Latitude: {country.latlng[0]}
              </p>
              <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold">
                <TbWorldLongitude />
                Longitude: {country.latlng[1]}
              </p>
              <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold">
                <TbTimezone />
                Timezone: {country.timezones.slice(0, 1)}
              </p>
              {/* <p className="flex items-center gap-1  pb-2 pl-2 text-lg font-semibold capitalize">
                <BsCurrencyExchange />
                Currency: {}
              </p> */}
              <p className="flex items-center gap-1  pb-2 pl-2 text-lg font-semibold capitalize">
                <PiCarProfileBold />
                Driving Side: {country.car.side}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Countries;
