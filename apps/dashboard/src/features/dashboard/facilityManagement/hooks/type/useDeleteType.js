import { useMutation, useQueryClient } from "react-query";
import { deleteType } from "../../api/type/deleteType";
import { GET_TYPES_QUERY_KEY } from "./useTypes";
import { GET_LISTS_QUERY_KEY } from "../list/useLists";

export function useDeleteType({ config, handleSuccess, name, id }) {
   const queryClient = useQueryClient();

   return useMutation(() => deleteType({ id, name }), {
      onSuccess(data) {
         queryClient.invalidateQueries(`${GET_TYPES_QUERY_KEY}-${name}`);
         queryClient.invalidateQueries(`${GET_LISTS_QUERY_KEY}-${name}`);
         handleSuccess(data);
      },
      ...config,
   });
}
