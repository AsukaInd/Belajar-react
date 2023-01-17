import { axiosInstance } from "~/lib/axios";
import { API_BASE_URL } from "~/config/apiConfig";

export function getSanctumCookie() {
   return axiosInstance.get(`${API_BASE_URL}/sanctum/csrf-cookie`);
}
