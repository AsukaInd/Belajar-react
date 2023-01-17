import { useMutation, useQueryClient } from "react-query";
import { addClient } from "../../api/client/addClient";
import { editClient } from "../../api/client/editClient";
import { GET_CLIENTS_QUERY_KEY } from "./useClients";

export function useClientForm({ config, handleSuccess, isEdit }) {
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries([GET_CLIENTS_QUERY_KEY]);
      if (handleSuccess) {
         handleSuccess(data);
      }
   }

   if (isEdit) {
      return useMutation(editClient, {
         onSuccess,
         ...config,
      });
   }

   return useMutation(addClient, {
      onSuccess,
      ...config,
   });
}
