import axios from "axios";
import { useEffect, useState } from "react";
import Countries from "./components/Countries";

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const insensitiveIncludes = (a, b) => {
    return a.toLowerCase().includes(b.toLowerCase());
  };

  const filteredCountries = countries.filter((country) =>
    insensitiveIncludes(country.name.common, query)
  );

  const url = "https://restcountries.com/v3.1/all";

  const getCountries = () => {
    return axios.get(url).then((response) => response.data);
  };

  useEffect(() => {
    getCountries().then((countries) => setCountries(countries));
  }, []);

  return (
    <div>
      <p>
        find countries: <input value={query} onChange={handleQueryChange} />
      </p>
      <Countries filteredCountries={filteredCountries} setQuery={setQuery} />
    </div>
  );
}

export default App;
