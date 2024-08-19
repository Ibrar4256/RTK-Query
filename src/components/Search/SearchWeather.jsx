import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetLocationDataQuery } from "../../services/SearchApi";
import { setCoordinates } from "../../app/coordinateSlice";
import { addSearch } from "../../app/searchHistorySlice";
import "./SearchWeather.css";

const SearchCity = () => {
  const [city, setCity] = useState("");
  const [showRecent, setShowRecent] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const dispatch = useDispatch();
  const recentSearches = useSelector((state) => state.searchHistory);

  const { data } = useGetLocationDataQuery(city, {
    skip: !triggerSearch,
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      dispatch(setCoordinates({ lat, lon, cityName: city.trim() }));
      setTriggerSearch(false);
      setShowRecent(false); // Hide recent searches dropdown after a successful search
    }
  }, [data, dispatch]);

  const handleSearch = () => {
    if (city.trim().length >= 3 && !recentSearches.includes(city.trim())) {
      setTriggerSearch(true);
      dispatch(addSearch(city.trim()));
    }
  };

  const handleRecentSearchClick = (search) => {
    setCity(search);
    setTriggerSearch(true);
  };

  return (
    <div className="search-city">
      <div className="search-input-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
          placeholder="Enter city name"
          onFocus={() => setShowRecent(true)}
        />
        <button onClick={handleSearch}>Search</button>
        {showRecent && recentSearches.length > 0 && (
          <div className="recent-searches-dropdown">
            <ul>
              {recentSearches.map((search, index) => (
                <li key={index} onClick={() => handleRecentSearchClick(search)}>
                  {search}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCity;
