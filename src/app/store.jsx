// import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import { weatherApi } from "../services/WeatherApi";

// export const store = configureStore({
//     reducer:  {
//         [weatherApi.reducerPath]: weatherApi.reducer
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(weatherApi.middleware),
// })

// setupListeners(store.dispatch)

import { configureStore } from "@reduxjs/toolkit";
import coordinatesReducer from "./coordinateSlice";
import searchHistoryReducer from "./searchHistorySlice";
import { weatherApi } from "../services/WeatherApi";
import { searchApi } from "../services/SearchApi";

export const store = configureStore({
  reducer: {
    searchHistory: searchHistoryReducer,
    coordinates: coordinatesReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware, searchApi.middleware),
});
