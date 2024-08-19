import { createSlice } from "@reduxjs/toolkit";

const loadSearchHistory = () => {
  const history = localStorage.getItem("searchHistory");
  return history ? JSON.parse(history) : [];
};

const saveSearchHistory = (history) => {
  localStorage.setItem("searchHistory", JSON.stringify(history));
};

const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState: loadSearchHistory(),
  reducers: {
    addSearch: (state, action) => {
      const newHistory = [action.payload, ...state].slice(0, 5);
      saveSearchHistory(newHistory);
      return newHistory;
    },
  },
});

export const { addSearch } = searchHistorySlice.actions;
export default searchHistorySlice.reducer;
