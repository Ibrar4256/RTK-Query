import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org",
  }),
  endpoints: (builder) => ({
    getLocationData: builder.query({
      query: (city) =>
        `geo/1.0/direct?q=${city}&limit=1&appid=744b0d278f50c5bbc6f57aa39d504542`,
    }),
  }),
});

export const { useGetLocationDataQuery } = searchApi;
