import { useMutation, useQueryClient } from "react-query";
import { addTourStop } from "../../api/tourStop/addTourStop";
import { editTourStop } from "../../api/tourStop/editTourStop";
import { GET_TOUR_STOPS_QUERY_KEY } from "./useTourStops";

export function useTourStopForm({ config, handleSuccess, isUpdate }) {
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries([GET_TOUR_STOPS_QUERY_KEY]);
      if (handleSuccess) {
         handleSuccess(data);
      }
   }

   if (isUpdate) {
      return useMutation(editTourStop, {
         onSuccess,
         ...config,
      });
   }

   return useMutation(addTourStop, {
      onSuccess,
      ...config,
   });
}
