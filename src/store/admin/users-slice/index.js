// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   isLoading: false,
//   users: [],
// };

// // for fetch all product
// export const fetchAllUsers = createAsyncThunk(
//   "/admin/fetchAllUsers",
//   async () => {
//     const result = await axios.get("https://zylomart-3bzq.onrender.com/api/admin/users/get");
//     return result?.data;
//   }
// );

// const usersSlice = createSlice({
//   name: "userAdmin",
//   initialState,
//   reducers: {},

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllUsers.pending, (state) => {
//         state.isLoading = true;
//       })
//       // .addCase(fetchAllUsers.fulfilled, (state, action) => {
//       //   state.isLoading = false;
//       //   state.users = action.payload.data || action.payload;
//       // })
//       .addCase(fetchAllUsers.fulfilled, (state, action) => {
//         console.log("Redux Payload:", action.payload); // Debugging
//         state.isLoading = false;

//         // Ensure users is always an array
//         if (Array.isArray(action.payload)) {
//           state.users = action.payload;
//         } else if (Array.isArray(action.payload.data)) {
//           state.users = action.payload.data;
//         } else {
//           state.users = []; // Default to empty array if something goes wrong
//         }
//       })

//       .addCase(fetchAllUsers.rejected, (state, action) => {
//         console.log(action.payload);
//         state.isLoading = false;
//         state.users = [];
//       });
//   },
// });

// export default usersSlice.reducer;

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
        console.log("Redux Payload:", action.payload); // Debugging
        state.isLoading = false;

        if (Array.isArray(action.payload.users)) {
          state.users = action.payload.users;
        } else {
          state.users = [];
        }
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        console.error("Error fetching users:", action.payload);
        state.isLoading = false;
        state.error = action.payload;
        state.users = [];
      });
  },
});

export default usersSlice.reducer;
