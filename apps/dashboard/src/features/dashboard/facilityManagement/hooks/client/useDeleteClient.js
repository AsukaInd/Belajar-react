import { useMutation, useQueryClient } from "react-query";
import { deleteClient } from "../../api/client/deleteClient";
import { GET_CLIENTS_QUERY_KEY } from "./useClients";

export function useDeleteClient({ onSuccess, id, ...config }) {
   const queryClient = useQueryClient();

   function handleSuccess(data) {
      queryClient.invalidateQueries([GET_CLIENTS_QUERY_KEY]);
      if(onSuccess) {
         onSuccess(data)
      }
   }

   return useMutation(() => deleteClient(id), {
      onSuccess: handleSuccess,
      ...config,
   });
}
