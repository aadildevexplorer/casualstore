import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  users: [],
  error: null,
};

// Fetch all users from the API
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://zylomart-3bzq.onrender.com/api/admin/users/get"
      );
      return response.data; // Assuming the response contains { users: [...] }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
  }
);

const usersSlice = createSlice({
  name: "userAdmin",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;

        if (Array.isArray(action.payload.users)) {
          state.users = action.payload.users;
        } else {
          state.users = [];
        }
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.users = [];
      });
  },
});

export default usersSlice.reducer;
