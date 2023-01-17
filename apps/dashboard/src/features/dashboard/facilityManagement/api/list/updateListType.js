import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function updateListType({ name, id, notInTheList, inTheList }) {
   const token = tokenStorage.getTokens();

   try {
      const headers = createHeaders(
         token[SUBSCRIBER_KEY]
      );

      return Promise.all([
         inTheList.length > 0 &&
         axiosInstance.post(
            `/subscriber/types/${name}/lists/assign-type`,
            {
               list_id: id,
               type_id: inTheList.map((type) => type.id),
            },
            {
               headers,
            }
         ),
         notInTheList.length > 0 &&
         axiosInstance.post(
            `/subscriber/types/${name}/lists/unassign-type`,
            {
               list_id: id,
               type_id: notInTheList.map((type) => type.id),
            },
            {
               headers,
            }
         ),
      ]);
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
