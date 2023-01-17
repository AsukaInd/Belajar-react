import { useMutation, useQueryClient } from "react-query";
import { editGigs } from "../../api/Gigs/editGigs";
import { GET_GIGS_QUERY_KEY } from "./useGigs";

export function useUploadImage({ config, handleSuccess } = {}) {
   const queryGigs = useQueryClient();

   function onSuccess(data) {
      queryGigs.invalidateQueries(GET_GIGS_QUERY_KEY);
      if (handleSuccess) {
         handleSuccess(data);
      }
   }

   return useMutation(editGigs, {
      onSuccess,
      ...config,
   });
}