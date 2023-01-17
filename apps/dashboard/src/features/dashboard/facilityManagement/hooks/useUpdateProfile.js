import { useMutation, useQueryClient } from "react-query";
import { updateProfile } from "../api/updateProfile";
import { GET_PROFILE_QUERY_KEY } from "./useProfile";

export function useUpdateProfile(props = {}) {
   const { config, handleSuccess } = props;
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries(GET_PROFILE_QUERY_KEY);
      if (handleSuccess) {
         handleSuccess(data);
      }
   }

   return useMutation(updateProfile, {
      onSuccess,
      ...config,
   });
}
