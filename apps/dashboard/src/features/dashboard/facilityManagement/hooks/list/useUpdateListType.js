import { useMutation, useQueryClient } from "react-query";
import { updateListType } from "../../api/list/updateListType";
import { GET_LISTS_QUERY_KEY } from "./useLists";

export function useUpdateListType(props) {
   const { config, handleSuccess, name, list_id, inTheList, notInTheList } =
      props;
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries(`${GET_LISTS_QUERY_KEY}-${name}`);
      if (handleSuccess) {
         handleSuccess(data);
      }
   }

   return useMutation(
      () =>
         updateListType({
            name: "equimpent",
            id: list_id,
            inTheList,
            notInTheList,
         }),
      {
         onSuccess,
         ...config,
      }
   );
}
