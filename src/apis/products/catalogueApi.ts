import { axiosInstance } from "apis/axios";

export const getCatalogueApi = () => {
  return axiosInstance.get("/catalog");
};
