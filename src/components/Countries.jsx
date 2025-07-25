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
        setError("");

        const covidResponse = await axios.get(
          "https://disease.sh/v3/covid-19/countries"
        );

        const countriesResponse = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,capital,languages,area,timezones,currencies,car"
        );

        const mergedData = covidResponse.data.map((covidCountry) => {
          const countryData = countriesResponse.data.find(
            (country) =>
              country?.name?.common?.toLowerCase() ===
              covidCountry?.country?.toLowerCase()
          );

          return {
            ...covidCountry,
            additionalInfo: countryData || {},
          };
        });

        setCountries(mergedData);
        console.log(mergedData);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError(error?.message || "Failed to load countries");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="bg-[#04392740]">
      <div className="flex flex-col sm:flex-row items-center justify-between pt-4 sm:pt-10 md:pt-15 lg:pt-25 pl-4 sm:pl-25 pr-4 sm:pr-25 gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#043927]">
          ALL COUNTRIES
        </h2>
        <NavLink
          to="map"
          className="bg-[#043927] rounded-lg p-2 text-lg shadow-lg hover:shadow-[#04392740] text-white font-bold flex items-center gap-1"
        >
          <TbWorldSearch />
          SEARCH ON MAP
        </NavLink>
      </div>
      {error && (
        <p className="min-h-screen text-lg font-semibold text-[#043927] p-25 uppercase">
          {error}
        </p>
      )}
      {loading ? (
        <p className="min-h-screen text-lg font-semibold text-[#043927] p-25">
          LOADING...
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-15 pt-4 sm:pt-6 md:pt-8 lg:pt-10 p-4 sm:p-25">
          {countries.map((country, id) => (
            <div
              key={country?.country || id}
              className="bg-white text-[#043927] rounded-lg shadow-lg font-semibold p-5"
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold uppercase flex flex-col sm:flex-row items-baseline justify-between gap-2">
                {country?.country || "Unknown Country"}
                <img
                  src={country?.countryInfo?.flag}
                  alt={`${country?.country || "Country"} flag`}
                  className="h-10 w-15 border-1 border-gray-300"
                />
              </h3>
              <p className="pb-4 text-lg sm:text-xl md:text-2xl font-semibold">
                Located in {country?.continent || "N/A"}
              </p>
              <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold">
                <PiCityFill />
                Capital City: {country?.additionalInfo?.capital?.[0] || "N/A"}
              </p>
              <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold">
                <FaLanguage />
                Languages:{" "}
                {country?.additionalInfo?.languages
                  ? Object.values(country.additionalInfo.languages)
                      .slice(0, 2)
                      .join(", ")
                  : "N/A"}
              </p>
              <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold">
                <PiMapPinAreaBold />
                Area:{" "}
                {country?.additionalInfo?.area
                  ? `${country.additionalInfo.area} km²`
                  : "N/A"}
              </p>
              <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold">
                <FaPeopleGroup />
                Population: {country?.population?.toLocaleString() || "N/A"}
              </p>
              <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold">
                <TbWorldLatitude />
                Latitude: {country?.countryInfo?.lat || "N/A"}
              </p>
              <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold">
                <TbWorldLongitude />
                Longitude: {country?.countryInfo?.long || "N/A"}
              </p>
              <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold">
                <TbTimezone />
                Timezone: {country?.additionalInfo?.timezones?.[0] || "N/A"}
              </p>
              <p className="flex items-center gap-1  pb-2 pl-2 text-lg font-semibold capitalize">
                <BsCurrencyExchange />
                Currency:{" "}
                {country?.additionalInfo?.currencies
                  ? Object.values(country.additionalInfo.currencies)
                      .map((currency) => currency?.name || "Unknown")
                      .join(", ")
                  : "N/A"}
              </p>
              <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold capitalize">
                <PiCarProfileBold />
                Driving Side: {country?.additionalInfo?.car?.side || "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Countries;
