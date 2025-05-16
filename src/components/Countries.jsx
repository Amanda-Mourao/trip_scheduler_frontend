import axios from "axios";
import { useEffect, useState } from "react";

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
    <div className="p-20">
      <h2 className="text-4xl font-bold mb-15">ALL COUNTRIES</h2>
      {error && <p>{error}</p>}
      {loading ? (
        <p>LOADING...</p>
      ) : (
        <div className="grid grid-cols-3 gap-20">
          {countries.map((country, id) => (
            <div key={id}>
              <h3 className="text-lg font-bold uppercase">{country.name.common}</h3>
              <p>Located in {country.continents}</p>
              <p>Capital City is {country.capital}</p>
              <p>Languages: {}</p>
              <p>Area: {country.area} km²</p>
              <p>Population: {country.population}</p>
              <p>Latitude: {country.latlng[0]}</p>
              <p>Longitude: {country.latlng[1]}</p>
              <p>Timezone: {country.timezones}</p>
              <p>Driving side is {country.car.side}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Countries;
