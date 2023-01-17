import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";
import { toFormData } from "~/utils/toFormData";

export async function getContact({ id, page, perPage }) {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(
         `/pi/contact${id ? `/${id}` : ""}`,
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
export async function addContact(dataContact) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.post(
         "/pi/contact",
         toFormData(dataContact),
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


export async function editContact(editData) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.post(
         `/pi/contact/${editData.id}`,
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

export async function deleteContact({ id }) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.delete(`/pi/contact/${id}`, {
         headers: createHeaders(
            token[SUBSCRIBER_KEY] ? token[SUBSCRIBER_KEY] : token[ADMIN_KEY]
         ),
      });

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
