import { logoutUser } from "../features/user.slice";

// src/api/setupAxiosInterceptors.js
export const setupAxiosInterceptors = (store, axiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },

    (error) => {

      console.log(error)

      if (error.response?.status === 403) {
        store.dispatch(logoutUser());
      }
      return Promise.reject(error);
    }
  );
};
