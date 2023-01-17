import { useMutation, useQueryClient } from "react-query";
import { deletePreregisterVisitor } from "../../api/preregisterVisitor/deletePreregisterVisitor";
import { GET_PREREGISTER_VISITOR_QUERY_KEY } from "./usePreregisterVisitors";

export function useDeletePreregisterVisitor({ onSuccess, ...config }) {
   const queryClient = useQueryClient();

   function handleSuccess(data) {
      queryClient.invalidateQueries(GET_PREREGISTER_VISITOR_QUERY_KEY);

      if(onSuccess) {
         onSuccess(data)
      }
   }

   return useMutation(deletePreregisterVisitor, {
      onSuccess: handleSuccess,
      ...config,
   });
}
