import axios, { create } from 'axios'

import { API_URL } from "~/config/apiConfig";
import { getSanctumCookie } from "~/api/getSanctumCookie";
import { tokenStorage , ADMIN_KEY, SUBSCRIBER_KEY } from "~/utils/tokenStorage";


export const axiosInstance = create({
   baseURL: API_URL,
   withCredentials: import.meta.env.PROD,
});

function onResponseError(error) {
   if (error.response.status === 401) {
      const token = error?.config?.headers?.Authorization?.split(" ")[1];

      if (token) {
         tokenStorage.deleteToken(tokenStorage.getTokenId(token));
         window.location.replace("/");
      }
   }
   return Promise.reject(error);
}

axiosInstance.interceptors.response.use(null, onResponseError);

async function onRequest(config) {
   if (document.cookie.includes("XSRF-TOKEN")) {
      return config;
   }

   if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
   ) {
      await getSanctumCookie();
      return config;
   }

   return config;
}

axiosInstance.interceptors.request.use(onRequest, null);

export function createHeaders(token) {
   return {
      Authorization: `Bearer ${token}`,
   };
}

const token = tokenStorage.getTokens();
const tokenAdmin = token !== null ? token[ADMIN_KEY] : null

export const adminInstance = axios.create({
   baseURL: API_URL + 'pi',
   headers: {
      'Content_Type': 'application/json',
      authorization: 'Bearer ' + tokenAdmin
   }
})

export const adminInstanceWithFile = axios.create({
   baseURL: API_URL + 'pi',
   headers: {
      'Content_Type': 'multipart/form-data',
      authorization: 'Bearer ' + tokenAdmin
   }
})


const tokenUser = token !== null ? token[SUBSCRIBER_KEY] : null
export const subscriberInstance = axios.create({
   baseURL: API_URL + 'pi',
   headers: {
      'Content_Type': 'application/json',
      authorization: 'Bearer ' + tokenUser
   }
})

export const subscriberInstanceWithFile = axios.create({
   baseURL: API_URL + 'pi',
   headers: {
      'Content_Type': 'multipart/form-data',
      authorization: 'Bearer ' + tokenUser
   }
})