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
      {error && (
        <p className="text-lg font-semibold text-[#043927] uppercase">
          {error}
        </p>
      )}
      {loading ? (
        <p className="min-h-screen text-lg font-semibold text-[#043927]">
          LOADING...
        </p>
      ) : (
        <div className="flex justify-between items-between gap-10">
          <div className="bg-white h-[710px] w-325 text-[#043927] rounded-lg shadow-lg font-semibold border-40 border-white p-5">
            {selectedCountry ? (
              <>
                <h3 className="text-4xl font-semibold uppercase flex items-baseline justify-between pb-4">
                  {selectedCountry?.country || "Unknown Country"}
                  <img
                    src={selectedCountry?.countryInfo?.flag}
                    alt={`${selectedCountry?.country || "Country"} flag`}
                    className="h-10 w-15 border-1 border-gray-300"
                  />
                </h3>
                <p className="pb-4 text-2xl font-semibold">
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
