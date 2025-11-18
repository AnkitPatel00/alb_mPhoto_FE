import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";


export const getUser = createAsyncThunk("get/user", async(_,{rejectWithValue}) => {
  try {
    const response = await axiosInstance.get("/auth/user/profile/google", { withCredentials: true })
    return response.data.user
  }
  catch (error)
  {
    if (error.response.data.error)
    {
      return rejectWithValue(error.response.data.error)
    }
    return rejectWithValue(error.message || "unknown error")
  }
})

export const logoutUser = createAsyncThunk("logout/user",async() => {
  try {
    const response = await axiosInstance.get("/auth/logout", { withCredentials: true })
    return response.data.message
  }
  catch (error)
  {
return error.message || "unknown error"
  }
})


export const checkToken = createAsyncThunk("check/token",async(_,{rejectWithValue}) => {
  try {
    const response = await axiosInstance.get("/auth/checkToken", { withCredentials: true })
console.log(response.data.message)
    return response.data.message
  }
  catch (error)
  {
return rejectWithValue(error.message || "unknown error")
  }
})

const userSlice = createSlice({
  name: "userState",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")),
    status: "idle",
    statusLogout: "idle",
    message:"",
    error: null,
    checkTokenStatus:"idle"
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.status="loading"
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.status = "success"
      state.user = action.payload
      const userStr = JSON.stringify(action.payload)
      localStorage.setItem("user",userStr)
    })
    builder.addCase(getUser.rejected, (state, action) => {
      state.status = "failed"
      state.error = action.payload
      localStorage.removeItem("user")
    })



    builder.addCase(logoutUser.pending, (state) => {
      state.statusLogout="loading"
    })
    builder.addCase(logoutUser.fulfilled, (state,action) => {
      state.statusLogout = "success"
      state.message = action.payload
      state.user = null
      localStorage.removeItem("user")
      
    })
    builder.addCase(logoutUser.rejected, (state,action) => {
      state.statusLogout = "failed"
      state.error=action.payload
    })

    //

    builder.addCase(checkToken.pending, (state) => {
      state.checkTokenStatus="loading"
    })
    builder.addCase(checkToken.fulfilled, (state,action) => {
      state.checkTokenStatus = "success"
      
    })
    builder.addCase(checkToken.rejected, (state,action) => {
      state.checkTokenStatus = "failed"
      
    })
  }
})

export default userSlice.reducer