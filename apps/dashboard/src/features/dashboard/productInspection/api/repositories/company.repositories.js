import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";
import { toFormData } from "~/utils/toFormData";

export async function getCompany({ id, page, perPage }) {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(
         `/pi/supplier${id ? `/${id}` : ""}`,
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
export async function addCompany(dataCompany) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.post(
         "/pi/supplier",
         toFormData(dataCompany),
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


export async function editCompany(editData) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.post(
         `/pi/supplier/${editData.id}`,
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

export async function deleteCompany({ id }) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.delete(`/pi/supplier/${id}`, {
         headers: createHeaders(
            token[SUBSCRIBER_KEY] ? token[SUBSCRIBER_KEY] : token[ADMIN_KEY]
         ),
      });

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
