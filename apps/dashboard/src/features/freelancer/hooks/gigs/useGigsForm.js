import { useMutation, useQueryClient } from "react-query";
import { addGigs } from "../../api/Gigs/addGigs";
import { editGigs } from "../../api/Gigs/editGigs";
import { GET_PROFILE_QUERY_KEY } from "../useProfile";
import { GET_GIGS_QUERY_KEY } from "./useGigs";

export function useGigsForm({ onSuccess, isEdit, ...config } = {}) {
   const queryGigs = useQueryClient();

   function handleSuccess(data) {
      queryGigs.invalidateQueries([GET_GIGS_QUERY_KEY]);
      queryGigs.invalidateQueries(GET_PROFILE_QUERY_KEY);
      if (onSuccess) {
         onSuccess(data);
      }
   }

   if (isEdit) {
      return useMutation(editGigs, {
         onSuccess: handleSuccess,
         ...config,
      });
   }

   return useMutation(addGigs, {
      onSuccess: handleSuccess,
      ...config,
   });
}