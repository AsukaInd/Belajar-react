import { useMutation, useQueryClient } from "react-query";
import { editClient } from "../../api/client/editClient";
import { GET_CLIENTS_QUERY_KEY } from "./useClients";

export function useUploadProfileImage({ config, handleSuccess } = {}) {
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries(GET_CLIENTS_QUERY_KEY);
      if (handleSuccess) {
         handleSuccess(data);
      }
   }

   return useMutation(editClient, {
      onSuccess,
      ...config,
   });
}
