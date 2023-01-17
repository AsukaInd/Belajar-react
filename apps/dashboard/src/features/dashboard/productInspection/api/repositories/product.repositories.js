import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";
import { toFormData } from "~/utils/toFormData";

export async function getProduct({ id, page, perPage }) {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(
         `/pi/product${id ? `/${id}` : ""}`,
         {
            params: {
               page: page + 1,
               per_page: perPage
            },
            headers: createHeaders(token[SUBSCRIBER_KEY] ?? token[ADMIN_KEY]),
         }
      );

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}

export async function addProduct(dataProduct) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.post(
         `/pi/product`,
         toFormData(dataProduct),
         {
            headers: createHeaders(
               token[SUBSCRIBER_KEY] ? token[SUBSCRIBER_KEY] : token[ADMIN_KEY]
            ),
         }
      );

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}


export async function deleteProduct({ id }) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.delete(`/pi/product/${id}`, {
         headers: createHeaders(
            token[SUBSCRIBER_KEY] ? token[SUBSCRIBER_KEY] : token[ADMIN_KEY]
         ),
      });

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}

