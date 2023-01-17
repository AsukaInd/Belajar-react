import { useMutation, useQueryClient } from "react-query";
import { deleteTourStop } from "../../api/tourStop/deleteTourStop";
import { GET_TOUR_STOPS_QUERY_KEY } from "./useTourStops";

export function useDeleteTourStop({ onSuccess, id, isBulkDelete, ids, ...config }) {
   const queryClient = useQueryClient();

   function handleSuccess(data) {
      queryClient.invalidateQueries([GET_TOUR_STOPS_QUERY_KEY]);

      if(onSuccess) {
         onSuccess(data)
      }
   }

   return useMutation(() => deleteTourStop({id, isBulkDelete, ids}), {
      onSuccess: handleSuccess,
      ...config,
   });
}
