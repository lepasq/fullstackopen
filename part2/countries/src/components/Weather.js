import axios from "axios";
import { useEffect, useState } from "react";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState();
  const app_id = process.env.REACT_APP_API_KEY;

  const getIconUrl = () => {
    return `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  }

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${app_id}&units=metric`
      )
      .then((response) => setWeather(response.data));
  }, []);

  if (weather === undefined) {
    return <></>;
  }

  return (
    <>
      <h2>Weather in {capital}</h2>
      <p>temperature {weather.main.temp} Celsius</p>
      {<img src={getIconUrl()} alt="temperature alt" />}
      <p>wind {weather.wind.speed} m/s</p>
    </>
  );
};

export default Weather;
