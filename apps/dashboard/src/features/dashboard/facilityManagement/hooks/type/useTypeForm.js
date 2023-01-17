import { useMutation, useQueryClient } from "react-query";
import { addType } from "../../api/type/addType";
import { updateType } from "../../api/type/updateType";
import { GET_TYPES_QUERY_KEY } from "./useTypes";
import { GET_LISTS_QUERY_KEY } from "../list/useLists";

export function useTypeForm(props) {
   const { config, handleSuccess, name, isUpdate } = props;
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries(`${GET_TYPES_QUERY_KEY}-${name}`);
      queryClient.invalidateQueries(`${GET_LISTS_QUERY_KEY}-${name}`);
      handleSuccess(data);
   }

   if (isUpdate) {
      return useMutation(updateType, {
         onSuccess,
         ...config,
      });
   }

   return useMutation(addType, {
      onSuccess,
      ...config,
   });
}
