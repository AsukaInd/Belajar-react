import { useMutation, useQueryClient } from "react-query";
import { addMember } from "~/features/dashboard/facilityManagement/api/members/addMember";
import { updateMember } from "~/features/dashboard/facilityManagement/api/members/updateMember";
import { GET_MEMBERS_QUERY_KEY } from "./useMembers";

export function useMemberForm(props) {
   const { config, handleSuccess, isUpdate } = props;
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries(GET_MEMBERS_QUERY_KEY);
      handleSuccess(data);
   }

   if (isUpdate) {
      return useMutation(updateMember, {
         onSuccess,
         ...config,
      });
   }

   return useMutation(addMember, {
      onSuccess,
      ...config,
   });
}
