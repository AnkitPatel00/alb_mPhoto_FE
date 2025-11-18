import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user.slice'
import { setupAxiosInterceptors } from '../api/setupAxiosInterceptors'
import axiosInstance from '../api/axiosInstance'
import albumReducer from '../features/album.slice'
import photoReducer from '../features/photo.slice'

const store = configureStore({
  reducer: {
    userState:userReducer,
    albumState: albumReducer,
    photoState:photoReducer
  }
})

setupAxiosInterceptors(store,axiosInstance)

export default store