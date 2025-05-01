import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axioseConfig/instance";



export const changePassword = createAsyncThunk(
  "users/changePassword",
  async ({ oldPassword, newPassword, confirmPassword }, { rejectWithValue }) => {
    if (newPassword !== confirmPassword) {
      return rejectWithValue("Passwords do not match");
    }

    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'User-Id': userId
        }
      };

      const response = await axiosInstance.post('/users/change-password', { currentPassword: oldPassword, newPassword }, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (user) => {
    const res = await axiosInstance.post("/users/register", user);
    return res.data;
  }
);
export const registerUserWithGoogle = createAsyncThunk(
  "users/registerUser/google",
  async (user) => {
    const res = await axiosInstance.post("/users/register/google", user);

    return res.data;
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (userData) => {
    try {
      const res = await axiosInstance.post("/users/login", userData);

      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const loginUserWithGoogle = createAsyncThunk(
  "users/loginUser/google",
  async (userData) => {
    try {
      const res = await axiosInstance.post("/users/login/google", userData);

      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId) => {
    const res = await axiosInstance.get(`/users/${userId}`);

    return res.data;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, updatedUser }) => {
    const res = await axiosInstance.put(`/users/updateUserAccount/${userId}`, updatedUser, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });


    return res.data;
  }
);


export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const res = await axiosInstance.get("/users");

    return res.data;
  }
);


export const getAllUsersAction = createAsyncThunk(
  "users/getAllUsersAction",
  async () => {
    const res = await axiosInstance.get("/users");

    return res.data;
  }
);


export const requestOTP = createAsyncThunk(
  "users/requestotp",
  async ({ email }) => {
    const res = await axiosInstance.post("/users/requestotp", { email });
    return res.data;
  }
);

export const verifyOTP = createAsyncThunk(
  "users/verifyOTP",
  async ({ otp, email }) => {
    try {
      ("Verify OTP Payload:", { otp, email });
      const res = await axiosInstance.post("/users/verifyotp", { otp, email });
      ("Verify OTP Response:", res.data);
      return res.data;
    } catch (error) {
      console.error("Verify OTP Error:", error.message);
      throw error;
    }
  }
);



export const resetPassword = createAsyncThunk(
  "users/resetpassword",
  async ({ email, newPassword }) => {
    const res = await axiosInstance.post("/users/resetpassword", { email, newPassword });
    return res.data;
  }
);


export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    const res = await axiosInstance.delete(`/users/deleteUser/${userId}`);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    otp: null,
    user: null,
    otpVerified: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem("token", action.payload.token);
        state.users = [action.payload]; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllUsersAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsersAction.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsersAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(requestOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otp = action.payload;
      })
      .addCase(requestOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otpVerified = true;
      })

      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
