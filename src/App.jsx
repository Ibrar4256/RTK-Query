import "./App.css";
import SearchCity from "./components/Search/SearchWeather";
import WeatherCard from "./components/WeatherCard/WeatherCard";

function App() {
  return (
    <div className="App" style={{ padding: "50px", textAlign: "center" }}>
      <h1>Weather Updates</h1>
      <SearchCity />
      <WeatherCard />
    </div>
  );
}

export default App;
