import { useMutation, useQuery, useQueryClient } from "react-query";
import { addCompany, deleteCompany, editCompany, getCompany } from "../repositories/company.repositories";

export const GET_COMPANY_QUERY_KEY = "company";

export function useCompany({ key, id, page, perPage } = {}) {
   return useQuery(
      [GET_COMPANY_QUERY_KEY, id, page, perPage], 
      () => getCompany({ id, page, perPage })
   );
}

export function useCompanyForm({ config, handleSuccess, isEdit }) {
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries([GET_COMPANY_QUERY_KEY]);
      if (handleSuccess) {
         handleSuccess(data);
      }
   }


   if (isEdit) {
      return useMutation(editCompany, {
         onSuccess,
         ...config,
      });
   }

   return useMutation(addCompany, {
      onSuccess,
      ...config,
   });
}

export function useDeleteCompany({ onSuccess, id, ...config }) {
   const queryClient = useQueryClient();

   function handleSuccess(data) {
      queryClient.invalidateQueries(`${GET_COMPANY_QUERY_KEY}`);

      if(onSuccess) {
         onSuccess(data);
      }
   }

   return useMutation(() => deleteCompany({ id }), {
      onSuccess: handleSuccess,
      ...config,
   });
}
