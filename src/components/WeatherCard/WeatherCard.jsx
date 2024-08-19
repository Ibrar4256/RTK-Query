import { useSelector } from "react-redux";
import { useGetCompleteWeatherDataQuery } from "../../services/WeatherApi";
import { useState } from "react";

const WeatherCard = () => {
  const { lat, lon, cityName } = useSelector((state) => state.coordinates);
  const { data, error, isLoading } = useGetCompleteWeatherDataQuery(
    { lat, lon },
    {
      skip: !lat || !lon,
    }
  );

  const [isCelsius, setIsCelsius] = useState(true);

  if (!lat || !lon) {
    return <div>Please search for a city first.</div>;
  }

  if (isLoading) return <h2>Loading...</h2>;

  if (error) return <h2>Error fetching data</h2>;

  if (
    !data ||
    !data.current ||
    !data.current.weather ||
    !data.current.weather.length
  ) {
    return <h2>No weather data available</h2>;
  }

  const iconBaseUrl = "http://openweathermap.org/img/wn/";
  const iconUrl = `${iconBaseUrl}${data.current.weather[0].icon}@4x.png`;

  const kelvinTemp = data.current.temp;
  const temperature = isCelsius
    ? (kelvinTemp - 273.15).toFixed(0)
    : (((kelvinTemp - 273.15) * 9) / 5 + 32).toFixed(0);

  const temperatureUnit = isCelsius ? "°C" : "°F";

  return (
    <div
      style={{
        textAlign: "center",
        margin: "0 auto",
        marginTop: "30px",
        backgroundColor: "#ccc",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "300px",
      }}
    >
      <h1>{cityName}</h1>
      <h3>Clouds: {data.current.clouds}%</h3>
      <h3>
        Temperature: {temperature}
        {temperatureUnit}
      </h3>
      <h3>Weather: {data.current.weather[0].description}</h3>
      <img src={iconUrl} alt={data.current.weather[0].description} />
      <button
        onClick={() => setIsCelsius(!isCelsius)}
        style={{
          marginTop: "10px",
          padding: "10px",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "#fff",
        }}
      >
        {isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"}
      </button>
    </div>
  );
};

export default WeatherCard;
