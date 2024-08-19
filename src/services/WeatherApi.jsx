import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org",
  }),
  endpoints: (builder) => ({
    getCompleteWeatherData: builder.query({
      query: ({ lat, lon }) =>
        `data/3.0/onecall?lat=${lat}&lon=${lon}&appid=ae98a851a4107755aee48253cf0e2cea`,
    }),
  }),
});

export const { useGetCompleteWeatherDataQuery } = weatherApi;
