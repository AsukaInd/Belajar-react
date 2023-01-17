import { useMutation, useQueryClient } from "react-query";
import { createQuestionInspection } from "../api/createQuestionInspection";

export const GET_INSPECTION_QUERY_KEY = "inspection";

export function useInspectionQuestion({ config, handleSuccess, isEdit }) {
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries([GET_INSPECTION_QUERY_KEY]);
      if (handleSuccess) {
         handleSuccess(data);
      }
   }

   return useMutation(createQuestionInspection, {
      onSuccess,
      ...config,
   });
}
