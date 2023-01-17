import { useMutation, useQuery, useQueryClient } from "react-query";
import { addContact, deleteContact, editContact, getContact } from "../repositories/contact.repositories";

export const GET_CONTACT_QUERY_KEY = "contact";

export function useContact({ key, id, page, perPage } = {}) {
   return useQuery(
      [GET_CONTACT_QUERY_KEY, id, page, perPage], 
      () => getContact({ id, page, perPage })
   );
}
export function useContactForm({ config, handleSuccess, isEdit }) {
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries([GET_CONTACT_QUERY_KEY]);
      if (handleSuccess) {
         handleSuccess(data);
      }
   }


   if (isEdit) {
      return useMutation(editContact, {
         onSuccess,
         ...config,
      });
   }

   return useMutation(addContact, {
      onSuccess,
      ...config,
   });
}

export function useDeleteContact({ onSuccess, id, ...config }) {
   const queryClient = useQueryClient();

   function handleSuccess(data) {
      queryClient.invalidateQueries(`${GET_CONTACT_QUERY_KEY}`);

      if(onSuccess) {
         onSuccess(data);
      }
   }

   return useMutation(() => deleteContact({ id }), {
      onSuccess: handleSuccess,
      ...config,
   });
}
