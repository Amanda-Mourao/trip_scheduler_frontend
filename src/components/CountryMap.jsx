import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { PiListMagnifyingGlassBold } from "react-icons/pi";
import Map2 from "./Map2";
import { CgArrowLongRight } from "react-icons/cg";
import { PiCityFill } from "react-icons/pi";
import { FaLanguage } from "react-icons/fa6";
import { PiMapPinAreaBold } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbWorldLatitude } from "react-icons/tb";
import { TbWorldLongitude } from "react-icons/tb";
import { TbTimezone } from "react-icons/tb";
import { PiCarProfileBold } from "react-icons/pi";
import { BsCurrencyExchange } from "react-icons/bs";

function CountryMap() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

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

  const handleMarkerClick = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div className="bg-[#04392740] p-25">
      <div className="flex items-center justify-between pb-10">
        <h2 className="text-6xl font-bold text-[#043927]">ALL COUNTRIES</h2>
        <NavLink
          to="/countries"
          className="bg-[#043927] rounded-lg p-2 text-lg shadow-lg hover:shadow-[#04392740] text-white font-bold flex items-center gap-1"
        >
          <PiListMagnifyingGlassBold />
          BACK TO LIST
        </NavLink>
      </div>
      {error && <p>{error}</p>}
      {loading ? (
        <p className="text-lg font-semibold text-[#043927] p-25">LOADING...</p>
      ) : (
        <div className="flex justify-between items-between gap-10">
          <div className="bg-white h-[710px] w-325 text-[#043927] rounded-lg shadow-lg font-semibold border-40 border-white">
            {selectedCountry ? (
              <>
                <h3 className="text-4xl font-semibold uppercase flex items-baseline justify-between pb-8">
                  {selectedCountry.name.common}
                  <img
                    src={selectedCountry.flags?.png}
                    className="h-10 w-15 border-1 border-gray-300"
                  />
                </h3>
                <p className="flex items-center gap-1 pb-6 pl-2 text-xl font-semibold">
                  <PiCityFill />
                  Capital City: {selectedCountry.capital}
                </p>
                <p className="flex items-center gap-1 pb-6 pl-2 text-xl font-semibold">
                  <FaLanguage />
                  Languages:{" "}
                  {selectedCountry.languages
                    ? Object.values(selectedCountry.languages)
                        .slice(0, 2)
                        .join(", ")
                    : "N/A"}
                </p>
                <p className="flex items-center gap-1 pb-6 pl-2 text-xl font-semibold">
                  <PiMapPinAreaBold />
                  Area: {selectedCountry.area} km²
                </p>
                <p className="flex items-center gap-1 pb-6 pl-2 text-xl font-semibold">
                  <FaPeopleGroup />
                  Population: {selectedCountry.population}
                </p>
                <p className="flex items-center gap-1 pb-6 pl-2 text-xl font-semibold">
                  <TbWorldLatitude />
                  Latitude: {selectedCountry.latlng[0]}
                </p>
                <p className="flex items-center gap-1 pb-6 pl-2 text-xl font-semibold">
                  <TbWorldLongitude />
                  Longitude: {selectedCountry.latlng[1]}
                </p>
                <p className="flex items-center gap-1 pb-6 pl-2 text-xl font-semibold">
                  <TbTimezone />
                  Timezone: {selectedCountry.timezones.slice(0, 1)}
                </p>
                <p className="flex items-center gap-1 pb-6 pl-2 text-xl font-semibold capitalize">
                  <BsCurrencyExchange />
                  Currency:{" "}
                  {selectedCountry.currencies
                    ? Object.values(selectedCountry.currencies).map(
                        (currency) => currency.name
                      )
                    : "N/A"}
                </p>
                <p className="flex items-center gap-1  pb-6 pl-2 text-xl font-semibold capitalize">
                  <PiCarProfileBold />
                  Driving Side: {selectedCountry.car?.side}
                </p>
              </>
            ) : (
              <p className="text-3xl font-semibold text-[#043927b6]">
                CLICK ON A COUNTRY FOR MORE DETAILS
                <CgArrowLongRight className="text-6xl" />
              </p>
            )}
          </div>
          <div className="flex justify-end items-baseline border-40 border-white bg-white rounded-lg shadow-lg">
            <Map2
              countries={countries}
              onMarkerClick={handleMarkerClick}
              center={{ lat: 20, lng: 0 }}
              width="700px"
              height="630px"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryMap;
