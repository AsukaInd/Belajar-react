import { useMutation, useQueryClient } from "react-query";
import { visitorOut } from "../api/visitorOut";
import { GET_VISITORS_IN_QUERY_KEY } from "./useVisitors";

export function useVisitorOut({ config, handleSuccess }) {
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries(GET_VISITORS_IN_QUERY_KEY);
      handleSuccess(data);
   }

   return useMutation(visitorOut, { ...config, onSuccess });
}
