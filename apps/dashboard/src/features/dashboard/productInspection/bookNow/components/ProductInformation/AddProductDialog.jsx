import { useTranslation } from "react-i18next";
import { useProductForm } from "../../../api/services/product.services";
import { ProductFormDialog } from "./ProductFormDialog";

export function AddProductDialog({ isOpen, onClose,getValues }) {
   const { t } = useTranslation();

   const productForm = useProductForm({
      handleSuccess() {
         onClose();
      },
   });

   function save(newData) {
      productForm.mutate(newData);
   }

   return (
      <ProductFormDialog
         isOpen={isOpen} 
         onClose={() => {
            onClose()
            productForm.reset();
         }} 
         save={save}
         loading={productForm.isLoading}
         error={productForm.error}
         status={productForm.status}
         getValues={getValues}
      />
   );
}
