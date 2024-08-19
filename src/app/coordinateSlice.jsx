import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat: null,
  lon: null,
  cityName: "",
};

const coordinatesSlice = createSlice({
  name: "coordinates",
  initialState,
  reducers: {
    setCoordinates: (state, action) => {
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
      state.cityName = action.payload.cityName;
    },
  },
});

export const { setCoordinates } = coordinatesSlice.actions;
export default coordinatesSlice.reducer;
