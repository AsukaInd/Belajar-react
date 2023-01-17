import { useMutation, useQueryClient } from "react-query";
import { addOfficer } from "../../api/officer/addOfficer";
import { updateOfficer } from "../../api/officer/updateOfficer";
import { GET_OFFICERS_QUERY_KEY } from "./useOfficers";

export function useOfficerForm({ config, handleSuccess, isUpdate }) {
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries([GET_OFFICERS_QUERY_KEY]);
      handleSuccess(data);
   }

   if (isUpdate) {
      return useMutation(updateOfficer, {
         onSuccess,
         ...config,
      });
   }

   return useMutation(addOfficer, {
      onSuccess,
      ...config,
   });
}
