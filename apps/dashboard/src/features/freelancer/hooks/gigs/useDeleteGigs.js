import { useMutation, useQueryClient } from "react-query";
import { deleteGigs } from "../../api/Gigs/deleteGigs";
import { GET_GIGS_QUERY_KEY } from "./useGigs";

export function useDeleteGigs({ config, handleSuccess, id }) {
   const queryGigs = useQueryClient();

   return useMutation(() => deleteGigs(id), {
      onSuccess(data) {
         queryGigs.invalidateQueries([GET_GIGS_QUERY_KEY]);
         handleSuccess(data);
      },
      ...config,
   });
}