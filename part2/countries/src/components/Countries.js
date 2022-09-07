import Weather from "./Weather";

const Countries = ({ filteredCountries, setQuery }) => {
  if (filteredCountries.length === 1) {
    return <CountryDetails country={filteredCountries[0]} />;
  } else if (filteredCountries.length > 10) {
    return "Too many matches, specify another filter";
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return filteredCountries.map((country) => (
      <p key={country.name.common}>
        {country.name.common}
        <button onClick={() => setQuery(country.name.common)}>show</button>
      </p>
    ));
  }
};

const CountryDetails = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>

      <b>languages:</b>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt="flag" />
      <Weather capital={country.capital[0]} />
    </>
  );
};

export default Countries;
