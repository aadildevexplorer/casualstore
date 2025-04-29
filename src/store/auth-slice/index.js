// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   isAuthenticated: false,
//   isLoading: true,
//   user: null,
// };

// // for register
// export const registerUser = createAsyncThunk(
//   "/auth/register",
//   async (formData) => {
//     const response = await axios.post(
//       "https://zylomart-3bzq.onrender.com/api/auth/register",
//       formData,
//       {
//         withCredentials: true,
//       }
//     );
//     return response.data;
//   }
// );

// // for login
// export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
//   const response = await axios.post(
//     "https://zylomart-3bzq.onrender.com/api/auth/login",
//     formData,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// });

// // for logout

// export const logoutUser = createAsyncThunk("/auth/logout", async () => {
//   const response = await axios.post(
//     "https://zylomart-3bzq.onrender.com/api/auth/logout",
//     {},
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// });

// // auth Middleware

// export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
//   const response = await axios.get(
//     "https://zylomart-3bzq.onrender.com/api/auth/check-auth",
//     {
//       withCredentials: true,
//       headers: {
//         "Cache-Control":
//           "no-store, no-cache, must-revalidate, proxy-revalidate",
//       },
//     }
//   );
//   return response.data;
// });

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {},
//   },

//   extraReducers: (builder) => {
//     builder
//       // for register
//       .addCase(registerUser.pending, (state) => {
//         state.isLoading = true;
//       });

//     builder.addCase(registerUser.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.user = null;
//       state.isAuthenticated = false;
//     });

//     builder
//       .addCase(registerUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       })

//       // for login

//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//       });

//     builder.addCase(loginUser.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.user = action.payload.success ? action.payload.user : null;
//       state.isAuthenticated = action.payload.success;
//     });

//     builder
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       })

//       // for check-auth

//       .addCase(checkAuth.pending, (state) => {
//         state.isLoading = true;
//       });

//     builder.addCase(checkAuth.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.user = action.payload.success ? action.payload.user : null;
//       state.isAuthenticated = action.payload.success;
//     });

//     builder
//       .addCase(checkAuth.rejected, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       })

//       // for logout

//       .addCase(logoutUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       });
//   },
// });

// export const { setUser } = authSlice.actions;

// export default authSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// get user from localStorage (if exists)
const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  isAuthenticated: !!userFromStorage,
  isLoading: true,
  user: userFromStorage,
};

// Register
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      "https://zylomart-3bzq.onrender.com/api/auth/register",
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

// Login
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(
    "https://zylomart-3bzq.onrender.com/api/auth/login",
    formData,
    { withCredentials: true }
  );
  return response.data;
});

// Logout
export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  localStorage.removeItem("user");
  const response = await axios.post(
    "https://zylomart-3bzq.onrender.com/api/auth/logout",
    {},
    { withCredentials: true }
  );
  return response.data;
});

// Check Auth
export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get(
    "https://zylomart-3bzq.onrender.com/api/auth/check-auth",
    {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },

  extraReducers: (builder) => {
    builder

      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      });
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      //   if (action.payload && action.payload.user) {
      //     state.user = action.payload.user;
      //   }
      //   state.isAuthenticated = action.payload.success;
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;

        if (action.payload.success) {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;

        if (action.payload.success) {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        } else {
          localStorage.removeItem("user");
        }
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        // localStorage.removeItem("user");
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
