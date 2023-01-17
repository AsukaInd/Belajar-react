import { useMutation, useQuery, useQueryClient } from "react-query";
import { addOrder, deleteOrder, editOrder, getOrder } from "../repositories/order.repositories";

export const GET_ORDER_QUERY_KEY = "order";

export function useOrder({ key, id, page, perPage } = {}) {
   return useQuery(
      [GET_ORDER_QUERY_KEY, id, page, perPage], 
      () => getOrder({ id, page, perPage })
   );
}

export function useOrderForm({ config, handleSuccess, isEdit }) {
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries([GET_ORDER_QUERY_KEY]);
      if (handleSuccess) {
         handleSuccess(data);
         localStorage.removeItem("productId")
      }
   }


   if (isEdit) {
      return useMutation(editOrder, {
         onSuccess,
         ...config,
      });
   }

   return useMutation(addOrder, {
      onSuccess,
      ...config,
   });
}

export function useDeleteOrder({ onSuccess, id, ...config }) {
   const queryClient = useQueryClient();

   function handleSuccess(data) {
      queryClient.invalidateQueries(`${GET_ORDER_QUERY_KEY}`);

      if(onSuccess) {
         onSuccess(data);
      }
   }

   return useMutation(() => deleteOrder({ id }), {
      onSuccess: handleSuccess,
      ...config,
   });
}
