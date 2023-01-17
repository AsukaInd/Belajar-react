import { useMutation, useQueryClient } from "react-query";
import { truckOut } from "../api/truckOut";
import { GET_TRUCK_IN_QUERY_KEY } from "./useTruckIn";

export function useTruckOut({ config, handleSuccess }) {
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries(GET_TRUCK_IN_QUERY_KEY);
      handleSuccess(data);
   }

   return useMutation(truckOut, { ...config, onSuccess });
}
