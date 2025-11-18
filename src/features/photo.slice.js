import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../api/axiosInstance'

export const uploadImage = createAsyncThunk("image/upload", async (formData,{rejectWithValue}) => {
  try {
    const response = await axiosInstance.post("/photo", formData)

    return response.data.newImageData
  }
  catch (error)
  {
return rejectWithValue(error.message || "unknow error")
  }
})


export const getImage = createAsyncThunk("image/get", async (albumId,{rejectWithValue}) => {
  try {
    const response = await axiosInstance.get(`/photo${albumId?`/${albumId}`:""}`)
    return response.data.photos
  }
  catch (error)
  {
return rejectWithValue(error.message || "unknow error")
  }
})


export const getSharedImage = createAsyncThunk("sharedImage/get", async (_,{rejectWithValue}) => {
  try {
    const response = await axiosInstance.get('/photo/album/shared')
    return response.data.photos
  }
  catch (error)
  {
return rejectWithValue(error.message || "unknow error")
  }
})


export const deleteImage = createAsyncThunk("image/delete", async (imageId,{rejectWithValue}) => {
  try {
    const response = await axiosInstance.delete(`/photo${imageId?`/${imageId}`:""}`)
    return response.data.deletedPhoto
  }
  catch (error)
  {
return rejectWithValue(error.message || "unknow error")
  }
})


export const commentImage = createAsyncThunk("image/comment", async ({imageId,comment},{rejectWithValue}) => {
  try {
    const response = await axiosInstance.post(`/photo/comment${imageId ? `/${imageId}` : ""}`, { comment })
    console.log(response.data.updatedPhoto)
    return response.data.updatedPhoto
  }
  catch (error)
  {
return rejectWithValue(error.message || "unknow error")
  }
})


export const deleteComment = createAsyncThunk("comment/delete", async ({ imageId, commentId }, { rejectWithValue }) => {
  console.log(commentId);
  try {
    const response = await axiosInstance.post(`/photo/comment/delete${imageId ? `/${imageId}` : ""}`, {commentId })
    console.log(response.data.updatedPhoto)
    return response.data.updatedPhoto
  }
  catch (error)
  {
return rejectWithValue(error.message || "unknow error")
  }
})

const photoSlice = createSlice({
  name: "photoState",
  initialState: {
    photos: [],
    sharedPhotos: [],
    photoView:{state:false,photo:{}},
    uploadState: "idle",
    fetchImageState: "idle",
    deleteImageState: "idle",
    sharedImageState: "idle",
    commentImageState: "idle",
    commentDeleteState: "idle",
    photoFormState:false,
    shareListFormState:false,
    error:null
  },
  reducers: {
    photoFormStateControll:(state,action) => {
      state.photoFormState =action.payload
    },
    shareListFormStateControll:(state,action) => {
      state.shareListFormState =action.payload
    },
    setPhotoView: (state,action) => {
      state.photoView= action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(uploadImage.pending, (state) => {
      state.uploadState="loading"
    })
    builder.addCase(uploadImage.fulfilled, (state,action) => {
      state.uploadState = "success"
      state.photos = [action.payload,...state.photos]
      state.photoFormState=false
    })
    builder.addCase(uploadImage.rejected, (state) => {
      state.uploadState="rejected"
    })

    builder.addCase(getImage.pending, (state) => {
      state.fetchImageState="loading"
    })
    builder.addCase(getImage.fulfilled, (state,action) => {
      state.fetchImageState = "success"
      state.photos = action.payload
    })
    builder.addCase(getImage.rejected, (state) => {
      state.fetchImageState="rejected"
    })

//delete image

    builder.addCase(deleteImage.pending, (state) => {
      state.deleteImageState="loading"
    })
    builder.addCase(deleteImage.fulfilled, (state,action) => {
      state.deleteImageState = "success"
      const imageId = action.payload._id
      state.photos = state.photos.filter(({_id})=>_id!==imageId)
    })
    builder.addCase(deleteImage.rejected, (state) => {
      state.deleteImageState="rejected"
    })

    // getSharedImage



 builder.addCase(getSharedImage.pending, (state) => {
      state.sharedImageState="loading"
    })
    builder.addCase(getSharedImage.fulfilled, (state,action) => {
      state.sharedImageState = "success"
      state.sharedPhotos = action.payload
    })
    builder.addCase(getSharedImage.rejected, (state) => {
      state.sharedImageState="rejected"
    })

    //image comment

 builder.addCase(commentImage.pending, (state) => {
      state.commentImageState="loading"
    })
    builder.addCase(commentImage.fulfilled, (state,action) => {
      state.commentImageState = "success"
      state.photoView = { ...state.photoView, photo: action.payload }
      state.photos = state.photos.map((imgObj) => {
        
        if (imgObj._id == action.payload._id)
        {
          return action.payload
        }
        else {
          return imgObj
        }
      })
      state.sharedPhotos = state.sharedPhotos.map((imgObj) => {
        
        if (imgObj._id == action.payload._id)
        {
          return action.payload
        }
        else {
          return imgObj
        }
      })

    })
    builder.addCase(commentImage.rejected, (state) => {
      state.commentImageState="rejected"
    })


    //image delete comment

 builder.addCase(deleteComment.pending, (state) => {
      state.commentDeleteState="loading"
    })
    builder.addCase(deleteComment.fulfilled, (state,action) => {
      state.commentDeleteState = "success"
      state.photoView = { ...state.photoView, photo: action.payload }
      state.photos = state.photos.map((imgObj) => {
        if (imgObj._id == action.payload._id)
        {
          return action.payload
        }
        else {
          return imgObj
        }
      })
      state.sharedPhotos = state.sharedPhotos.map((imgObj) => {
        
        if (imgObj._id == action.payload._id)
        {
          return action.payload
        }
        else {
          return imgObj
        }
      })

    })
    builder.addCase(deleteComment.rejected, (state) => {
      state.commentDeleteState="rejected"
    })
    



  }
})

export default photoSlice.reducer
export const {photoFormStateControll,shareListFormStateControll,setPhotoView} = photoSlice.actions