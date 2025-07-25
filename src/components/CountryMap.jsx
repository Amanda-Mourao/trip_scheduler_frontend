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
            latlng: countryData?.latlng || [
              covidCountry?.countryInfo?.lat,
              covidCountry?.countryInfo?.long,
            ],
            name: { common: covidCountry?.country || "Unknown" },
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

  const handleMarkerClick = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div className="bg-[#04392740]">
      <div className="flex flex-col sm:flex-row items-center justify-between pt-4 sm:pt-10 md:pt-15 lg:pt-25 pl-4 sm:pl-25 pr-4 sm:pr-25 gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#043927]">
          ALL COUNTRIES
        </h2>
        <NavLink
          to="/countries"
          className="bg-[#043927] rounded-lg p-2 text-lg shadow-lg hover:shadow-[#04392740] text-white font-bold flex items-center gap-1"
        >
          <PiListMagnifyingGlassBold />
          BACK TO LIST
        </NavLink>
      </div>
      {error && (
        <p className="text-lg font-semibold text-[#043927] uppercase">
          {error}
        </p>
      )}
      {loading ? (
        <p className="min-h-screen text-lg font-semibold text-[#043927] p-4 sm:p-25">
          LOADING...
        </p>
      ) : (
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 sm:gap-10 pt-4 sm:pt-6 md:pt-8 lg:pt-10 p-4 sm:p-25">
          <div className="bg-white h-auto lg:h-[600px] w-full lg:w-auto lg:flex-[0.4] text-[#043927] rounded-lg shadow-lg font-semibold border-40 border-white p-5">
            {selectedCountry ? (
              <>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold uppercase flex flex-col sm:flex-row items-baseline justify-between pb-4 gap-2">
                  {selectedCountry?.country || "Unknown Country"}
                  <img
                    src={selectedCountry?.countryInfo?.flag}
                    alt={`${selectedCountry?.country || "Country"} flag`}
                    className="h-10 w-15 border-1 border-gray-300"
                  />
                </h3>
                <p className="pb-4 text-lg sm:text-xl md:text-2xl font-semibold">
                  Located in {selectedCountry?.continent || "N/A"}
                </p>
                <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold">
                  <PiCityFill />
                  Capital City:{" "}
                  {selectedCountry?.additionalInfo?.capital?.[0] || "N/A"}
                </p>
                <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold">
                  <FaLanguage />
                  Languages:{" "}
                  {selectedCountry?.additionalInfo?.languages
                    ? Object.values(selectedCountry.additionalInfo.languages)
                        .slice(0, 2)
                        .join(", ")
                    : "N/A"}
                </p>
                <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold">
                  <PiMapPinAreaBold />
                  Area:{" "}
                  {selectedCountry?.additionalInfo?.area
                    ? `${selectedCountry.additionalInfo.area} km²`
                    : "N/A"}
                </p>
                <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold">
                  <FaPeopleGroup />
                  Population:{" "}
                  {selectedCountry?.population?.toLocaleString() || "N/A"}
                </p>
                <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold">
                  <TbWorldLatitude />
                  Latitude: {selectedCountry?.countryInfo?.lat || "N/A"}
                </p>
                <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold">
                  <TbWorldLongitude />
                  Longitude: {selectedCountry?.countryInfo?.long || "N/A"}
                </p>
                <p className="flex items-center gap-1 pb-2 pl-2 text-lg font-semibold">
                  <TbTimezone />
                  Timezone:{" "}
                  {selectedCountry?.additionalInfo?.timezones?.[0] || "N/A"}
                </p>
                <p className="flex items-center gap-1  pb-2 pl-2 text-lg font-semibold capitalize">
                  <BsCurrencyExchange />
                  Currency:{" "}
                  {selectedCountry?.additionalInfo?.currencies
                    ? Object.values(selectedCountry.additionalInfo.currencies)
                        .map((currency) => currency?.name || "Unknown")
                        .join(", ")
                    : "N/A"}
                </p>
                <p className="flex items-center gap-1  pb-2 pl-2 text-lg font-semibold capitalize">
                  <PiCarProfileBold />
                  Driving Side:{" "}
                  {selectedCountry?.additionalInfo?.car?.side || "N/A"}
                </p>
              </>
            ) : (
              <p className="text-lg sm:text-2xl md:text-3xl font-semibold text-[#043927b6]">
                CLICK ON A COUNTRY FOR MORE DETAILS
                <CgArrowLongRight className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl" />
              </p>
            )}
          </div>
          <div className="bg-white border-40 border-white rounded-lg shadow-lg w-full lg:w-auto lg:flex-[0.6] overflow-hidden h-[400px] lg:h-[600px]">
            <Map2
              countries={countries}
              onMarkerClick={handleMarkerClick}
              center={{ lat: 20, lng: 0 }}
              width="100%"
              height="100%"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryMap;
