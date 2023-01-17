import { useMutation, useQueryClient } from "react-query";
import { addList } from "../../api/list/addList";
import { updateList } from "../../api/list/updateList";
import { GET_LISTS_QUERY_KEY } from "./useLists";

export function useListForm(props) {
   const { config, handleSuccess, name, isUpdate } = props;
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries(`${GET_LISTS_QUERY_KEY}-${name}`);
      handleSuccess(data);
   }

   if (isUpdate) {
      return useMutation(updateList, {
         onSuccess,
         ...config,
      });
   }

   return useMutation(addList, {
      onSuccess,
      ...config,
   });
}
