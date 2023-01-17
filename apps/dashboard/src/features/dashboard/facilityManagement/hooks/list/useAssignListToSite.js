import { useMutation, useQueryClient } from "react-query";
import { assignListToSite } from "../../api/list/assignListToSite";
import { GET_LISTS_QUERY_KEY } from "./useLists";

export function useAssignListToSite(props) {
   const { config, handleSuccess, name, dataUpdate } = props;
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries(`${GET_LISTS_QUERY_KEY}-${name}`);
      if (handleSuccess) {
         handleSuccess(data);
      }
   }

   return useMutation(
      () => assignListToSite({ name: "equipment", dataUpdate }),
      {
         onSuccess,
         ...config,
      }
   );
}
