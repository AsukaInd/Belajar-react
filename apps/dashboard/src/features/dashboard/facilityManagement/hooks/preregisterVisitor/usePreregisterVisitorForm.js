import { useMutation, useQueryClient } from "react-query";
import { addPreregisterVisitor } from "../../api/preregisterVisitor/addPreregisterVisitor";
import { updatePreregisterVisitor } from "../../api/preregisterVisitor/updatePreregisterVisitor";
import { GET_PREREGISTER_VISITOR_QUERY_KEY } from "./usePreregisterVisitors";

export function usePreregisterVisitorForm({
   handleSuccess,
   isEdit,
   ...config
}) {
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries([GET_PREREGISTER_VISITOR_QUERY_KEY]);
      if (handleSuccess) {
         handleSuccess(data);
      }
   }

   if (isEdit) {
      return useMutation(updatePreregisterVisitor, {
         onSuccess,
         ...config,
      });
   }

   return useMutation(addPreregisterVisitor, {
      onSuccess,
      ...config,
   });
}
