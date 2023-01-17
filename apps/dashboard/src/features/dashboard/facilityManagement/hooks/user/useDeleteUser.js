import { useMutation, useQueryClient } from "react-query";
import { deleteUser } from "../../api/user/deleteUser";
import { GET_CLIENT_USER_QUERY_KEY } from "./useClientUsers";

export function useDeleteUser({ onSuccess, userId, clientId, ...config }) {
   const queryClient = useQueryClient();

   function handleSuccess(data) {
      queryClient.invalidateQueries([GET_CLIENT_USER_QUERY_KEY, clientId]);

      if(onSuccess) {
         onSuccess(data)
      }
   }

   return useMutation(() => deleteUser({ userId, clientId }), {
      onSuccess: handleSuccess,
      ...config,
   });
}
