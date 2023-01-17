import { useMutation, useQueryClient } from "react-query";
import { deleteOfficer } from "../../api/officer/deleteOfficer";
import { GET_OFFICERS_QUERY_KEY } from "./useOfficers";

export function useDeleteOfficer({ config, handleSuccess, id }) {
   const queryClient = useQueryClient();

   return useMutation(() => deleteOfficer({ id }), {
      onSuccess(data) {
         queryClient.invalidateQueries(`${GET_OFFICERS_QUERY_KEY}`);
         handleSuccess(data);
      },
      ...config,
   });
}
