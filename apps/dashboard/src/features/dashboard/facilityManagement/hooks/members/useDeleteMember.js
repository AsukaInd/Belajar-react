import { useMutation, useQueryClient } from "react-query";
import { deleteMember } from "~/features/dashboard/facilityManagement/api/members/deleteMember";
import { GET_MEMBERS_QUERY_KEY } from "./useMembers";

export function useDeleteMember({ config, handleSuccess, id }) {
   const queryClient = useQueryClient();

   return useMutation(() => deleteMember({ id }), {
      onSuccess(data) {
         queryClient.invalidateQueries(GET_MEMBERS_QUERY_KEY);
         handleSuccess(data);
      },
      ...config,
   });
}
