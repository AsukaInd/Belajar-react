import { useMutation, useQuery, useQueryClient } from "react-query";
import { addProduct, deleteProduct, getProduct } from "../repositories/product.repositories";

export const GET_PRODUCT_QUERY_KEY = "PRODUCT";

export function useProduct({ key, id, page, perPage } = {}) {
   const product = useQuery(
      [GET_PRODUCT_QUERY_KEY, id, page, perPage],
      () => getProduct({ id, page, perPage }));
   const productSaved = localStorage.getItem("productId")
   console.log(productSaved)
   if (productSaved) {
      const filtered = product.data?.data?.data?.filter(e => productSaved.includes(e.id))

      product.empty = false
      if (product.data !== undefined) {
         product.data.data.data = filtered
      }
      console.log(product);
      console.log("this is contain product")
      return product

   } else {
      product.empty = true
      return product

   }
}

export function useProductForm(props) {
   const { config, handleSuccess, name, isUpdate } = props;
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries([GET_PRODUCT_QUERY_KEY]);
      if (handleSuccess) {
         handleSuccess(data);
      }
      console.log(data.data.id)
      let productId = JSON.parse(localStorage.getItem("productId"))
      if (productId !== null) {
         productId?.push(data.data.id)
      } else {
         productId = [data.data.id]
      }
      localStorage.setItem("productId", JSON.stringify(productId))

   }

   if (isUpdate) {
      return useMutation(updateProduct, {
         onSuccess,
         ...config,
      });
   }

   return useMutation(addProduct, {
      onSuccess,
      ...config,
   });
}


export function useDeleteProduct({ onSuccess, id, ...config }) {
   const queryClient = useQueryClient();

   function handleSuccess(data) {
      queryClient.invalidateQueries(`${GET_PRODUCT_QUERY_KEY}`);

      if (onSuccess) {
         const productId = JSON.parse(localStorage.getItem("productId"))
         const filtered = productId.filter(e => e !== id)
         console.log(productId);
         console.log(typeof id)
         localStorage.setItem("productId", JSON.stringify(filtered))
         onSuccess(data);
      }
   }

   return useMutation(() => deleteProduct({ id }), {
      onSuccess: handleSuccess,
      ...config,
   });
}

