import { useMutation, useQueryClient } from "react-query";
import { deleteList } from "../../api/list/deleteList";
import { GET_LISTS_QUERY_KEY } from "./useLists";

export function useDeleteList({ config, handleSuccess, name, id }) {
   const queryClient = useQueryClient();

   return useMutation(() => deleteList({ id, name }), {
      onSuccess(data) {
         queryClient.invalidateQueries(`${GET_LISTS_QUERY_KEY}-${name}`);
         handleSuccess(data);
      },
      ...config,
   });
}
