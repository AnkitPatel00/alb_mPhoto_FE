import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const createAlbum = createAsyncThunk("album/create", async (albumData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/album",albumData)
    return response.data.newAlbum
  }
  catch (error)
  {
return rejectWithValue(error.message || "unknown error")
  }
})


export const getAlbum = createAsyncThunk("album/get", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/album")
    return response.data.albums
  }
  catch (error)
  {
return rejectWithValue(error.message || "unknown error")
  }
})


export const shareAlbum = createAsyncThunk("album/share", async ({ email, albumId }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put("/album/share",{ email, albumId }) 
    return response.data.updatedAlbum
  }
  catch (error)
  {
return rejectWithValue(error.message || "unknown error")
  }
})


export const removeEmail = createAsyncThunk("album/removeEmail", async ({ email, albumId }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put("/album/remove-email",{ email, albumId }) 
    return response.data.updatedAlbum
  }
  catch (error)
  {
return rejectWithValue(error.message || "unknown error")
  }
})


export const removeAlbum = createAsyncThunk("album/remove", async (albumId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`/album/remove${albumId?`/${albumId}`:''}`) 
    return response.data.deletedAlbum
  }
  catch (error)
  {
return rejectWithValue(error.message || "unknown error")
  }
})

const albumSlice = createSlice({
  name: "albumState",
  initialState: {
    albums: [],
    albumCreateState: "idle",
    albumFetchState: "idle",
    shareAlbumState: "idle",
    removeEmailState: "idle",
    removeAlbumState: "idle",
    albumFormState:false,
    message:"",
    error:null
  },
  reducers: {
    albumFormControll:(state,action) => {
      state.albumFormState =action.payload
    }
  },
  extraReducers: (builder) => {

    //get album
    
    builder.addCase(getAlbum.pending, (state) => {
      state.albumFetchState="loading"
    })
    builder.addCase(getAlbum.fulfilled, (state,action) => {
      state.albumFetchState = "success"
      state.albums =action.payload
    })
    builder.addCase(getAlbum.rejected, (state,action) => {
      state.albumFetchState = "failed"
      state.error = action.payload
    })

    

    builder.addCase(createAlbum.pending, (state) => {
      state.albumCreateState="loading"
    })
    builder.addCase(createAlbum.fulfilled, (state,action) => {
      state.albumCreateState = "success"
      state.albumFormState=false
      state.albums =[action.payload,...state.albums]
    })
    builder.addCase(createAlbum.rejected, (state,action) => {
      state.albumCreateState = "failed"
      state.error = action.payload
    })

    //share album

    builder.addCase(shareAlbum.pending, (state) => {
      state.shareAlbumState="loading"
    })
    builder.addCase(shareAlbum.fulfilled, (state,action) => {
      state.shareAlbumState = "success"
      state.albums = state.albums.map((albumObj) => {
        if (albumObj._id == action.payload._id)
        {
          return action.payload
        }
        return albumObj
      })
    })
    builder.addCase(shareAlbum.rejected, (state,action) => {
      state.shareAlbumState = "failed"
      state.error = action.payload
    })

    //remove email


        builder.addCase(removeEmail.pending, (state) => {
      state.removeEmailState="loading"
    })
    builder.addCase(removeEmail.fulfilled, (state,action) => {
      state.removeEmailState = "success"
      state.albums = state.albums.map((albumObj) => {
        if (albumObj._id == action.payload._id)
        {
          return action.payload
        }
        return albumObj
      })
    })
    builder.addCase(removeEmail.rejected, (state,action) => {
      state.removeEmailState = "failed"
      state.error = action.payload
    })

    //remove Album

        builder.addCase(removeAlbum.pending, (state) => {
      state.removeAlbumState="loading"
    })
    builder.addCase(removeAlbum.fulfilled, (state,action) => {
      state.removeAlbumState = "success"
      state.albums = state.albums.filter(({_id}) => {
       return _id != action.payload._id
      })
    })
    builder.addCase(removeAlbum.rejected, (state,action) => {
      state.removeAlbumState = "failed"
      state.error = action.payload
    })

  }
})

export default albumSlice.reducer
export const {albumFormControll} = albumSlice.actions