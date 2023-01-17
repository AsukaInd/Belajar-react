import { useMutation, useQueryClient } from "react-query";
import { addUser } from "../../api/user/addUser";
import { updateUser } from "../../api/user/updateUser";
import { GET_CLIENT_USER_QUERY_KEY } from "./useClientUsers";
import { GET_USER_QUERY_KEY } from "./useUsers";

export function useUserForm(props) {
   const { config, handleSuccess, isUpdate, clientId } = props;
   const queryClient = useQueryClient();

   const queryKey = clientId ? [GET_CLIENT_USER_QUERY_KEY, clientId] : [GET_USER_QUERY_KEY]

   function onSuccess(data) {
      queryClient.invalidateQueries(queryKey);

      if(handleSuccess) {
         handleSuccess(data);
      }
   }

   if (isUpdate) {
      return useMutation(updateUser, {
         onSuccess,
         ...config,
      });
   }

   return useMutation(addUser, {
      onSuccess,
      ...config,
   });
}
