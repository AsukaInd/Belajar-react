import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";
import { toFormData } from "~/utils/toFormData";

export async function getOrder({ id, page, perPage }) {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(
         `/pi/product-inspection-order${id ? `/${id}` : ""}`,
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
export async function addOrder(dataOrder) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.post(
         "/pi/product-inspection-order",
         dataOrder,
         {
            headers: createHeaders(
               token[SUBSCRIBER_KEY]
            ),
         }
      );
      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}


export async function editOrder(editData) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.post(
         `/pi/product-inspection-order/${editData.id}`,
         toFormData(editData),
         {
            headers: createHeaders(
               token[SUBSCRIBER_KEY]
            ),
         }
      );

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}

export async function deleteOrder({ id }) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.delete(`/pi/product-inspection-order/${id}`, {
         headers: createHeaders(
            token[SUBSCRIBER_KEY] ? token[SUBSCRIBER_KEY] : token[ADMIN_KEY]
         ),
      });

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
