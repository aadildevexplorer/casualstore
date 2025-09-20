import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  // searchResults: [],
  searchResults: null,
};

export const getSearchResults = createAsyncThunk(
  "/order/getSearchResults",
  async (keyword) => {
    const response = await axios.get(
      `https://zylomart-3bzq.onrender.com/api/shop/search/${keyword}`
    );

    return response.data;
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      // state.searchResults = [];
      state.searchResults = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      // .addCase(getSearchResults.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.searchResults = action.payload.data;
      // })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = Array.isArray(action.payload.data)
          ? action.payload.data
          : [];
      })

      .addCase(getSearchResults.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = null;
        // state.searchResults = [];
      });
  },
});

export const { resetSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
