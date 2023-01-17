import { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "./productSchema";
import { ErrorMessage } from "~/components/ErrorMessage";
import { Dropzone } from "~/components/Dropzone";

export function ProductFormDialog(props) {
   const {
      isOpen,
      onClose,
      save,
      loading,
      error,
      editData,
      status,
      isView,
      getValues,
   } = props;

   const { t } = useTranslation();
   const {
      control,
      handleSubmit,
      formState: { errors, isValid },
      reset,
      setValue,
      register,
      watch,
   } = useForm({
      mode: "onChange",
      resolver: yupResolver(productSchema),
      defaultValues: {
         image: null,
      },
   });

   const image = watch("image");
   const disableButton = !isValid || image === null;

   useEffect(() => {
      if (editData && !loading) {
         Object.entries(editData).forEach(([key, value]) => {
            if (key === "vendor") {
               setValue("vendor_id", value.id);
            } else {
               setValue(key, value);
            }
         });
      }
   }, [editData, isOpen]);

   useEffect(() => {
      if (status === "success") {
         reset();
      }
   }, [status]);

   function onSubmit(data) {
      console.log(getValues("fc-email_factory"));
      console.log(data);
      const dataForm = {
         // data product
         product_name: data.product_name,
         po: data.po,
         qty_name: data.qty_name,
         qty_total: data.qty_name,
         style_no: data.style_no,
         units: data.units,
         image: data.image,
         supplier_id: getValues("supplier_id"),
         product_address: getValues("si-address"),
         product_category: getValues("product_category"),
         finished: getValues("finished"),
         finished_and_packed: getValues("finished_packed"),
         my_defect_critical: getValues("dc-critical"),
         my_defect_major: getValues("dc-major"),
         my_defect_minor: getValues("dc-minor"),
         color_material: getValues("ps-color_material"),
         dimention_weight: getValues("ps-dimention_weight"),
         packing_packaging: getValues("ps-packing_packaging"),
         logo_label: getValues("ps-logo_label"),
         shipping_mark: getValues("ps-shipping_mark"),
         add_comments: getValues("ps-add_comments"),
         approval_samples: getValues("approval_samples"),
         production_samples: getValues("product_samples"),
         inspection_date: getValues("ii-inspect_req_date"),
      };
      save(dataForm);
      
   }

   function closeDialog() {
      onClose();
      if (!editData) {
         reset();
      }
   }

   return (
      <Dialog
         modal
         visible={isOpen}
         style={{ width: "470px" }}
         showHeader={false}
         closable={false}
         className="p-fluid asset-form-dialog"
         onHide={closeDialog}
         transitionOptions={{
            timeout: 500,
         }}
      >
         <div
            className="flex align-items-center justify-content-between border-bottom-1 pb-2 mt-2 mb-4"
            style={{ borderColor: "var(--gray-50)" }}
         >
            <span className="text-xl font-bold">
               {isView ? (
                  <span>
                     View Product{" "}
                     <span style={{ color: "var(--primary-color)" }}>
                        {editData?.id}
                     </span>
                  </span>
               ) : editData ? (
                  "Edit Product"
               ) : (
                  "Add New Product"
               )}
            </span>
            <Button
               icon="pi pi-times"
               className="p-button-rounded p-button-text"
               style={{ color: "var(--accent-text-color)" }}
               onClick={closeDialog}
            />
         </div>
         <div>
            {isView && editData && (
               <img src={editData?.image} className="dialog-detail-image" />
            )}

            {!isView && (
               <div className="my-4">
                  <Dropzone
                     register={register}
                     file={image}
                     setValue={setValue}
                     valueKey="image"
                     isEdit={Boolean(editData)}
                  />
                  <small className="p-invalid text-red-500">
                     {!image && "image is required"}
                  </small>
               </div>
            )}

            <div className="field">
               <label htmlFor="po">
                  PO.No.<span className="required-field">*</span>
               </label>
               <Controller
                  name="po"
                  control={control}
                  render={({ field }) => (
                     <InputText
                        disabled={isView}
                        id="po"
                        placeholder="Input PO number"
                        {...field}
                     />
                  )}
               />
               <small className="p-invalid text-red-500">
                  {errors?.po?.message}
               </small>
            </div>

            <div className="field">
               <label htmlFor="product-name">
                  Product Name<span className="required-field">*</span>
               </label>
               <Controller
                  name="product_name"
                  control={control}
                  render={({ field }) => (
                     <InputText
                        disabled={isView}
                        id="product-name"
                        placeholder="Input product name"
                        {...field}
                     />
                  )}
               />
               <small className="p-invalid text-red-500">
                  {errors?.product_name?.message}
               </small>
            </div>
            <div className="field">
               <label htmlFor="qty-name">
                  Quantity<span className="required-field">*</span>
               </label>
               <Controller
                  name="qty_name"
                  control={control}
                  render={({ field }) => (
                     <InputText
                        disabled={isView}
                        id="qty-name"
                        placeholder="Input quantity"
                        {...field}
                     />
                  )}
               />
               <small className="p-invalid text-red-500">
                  {errors?.qty_name?.message}
               </small>
            </div>
            <div className="field">
               <label htmlFor="units">
                  Units<span className="required-field">*</span>
               </label>
               <Controller
                  name="units"
                  control={control}
                  render={({ field }) => (
                     <InputText
                        disabled={isView}
                        id="units"
                        placeholder="Input units"
                        {...field}
                     />
                  )}
               />
               <small className="p-invalid text-red-500">
                  {errors?.units?.message}
               </small>
            </div>

            <div className="field">
               <label htmlFor="style-no">
                  SKLU/Style No.<span className="required-field">*</span>
               </label>
               <Controller
                  name="style_no"
                  control={control}
                  render={({ field }) => (
                     <InputText
                        disabled={isView}
                        id="style-no"
                        placeholder="Input SKU/Style No."
                        {...field}
                     />
                  )}
               />
               <small className="p-invalid text-red-500">
                  {errors?.style_no?.message}
               </small>
            </div>
         </div>
         <ErrorMessage error={error} />
         <small className="p-invalid text-red-500">
            {!getValues("supplier_id") && "Please choose Supplier on Step 1"}
         </small>
         <br />
         <p className="text-xs mb-0 p-invalid text-red-500">
            {(!getValues("product_category") ||
               !getValues("finished") ||
               !getValues("finished_packed")) &&
               "Please choose Product Category and Finished\n"}
         </p>
         <p className="text-xs mb-0 p-invalid text-red-500">
            {(!getValues("ps-color_material") ||
               !getValues("ps-dimention_weight") ||
               !getValues("ps-packing_packaging") ||
               !getValues("ps-logo_label") ||
               !getValues("ps-shipping_mark") ||
               !getValues("ps-add_comments")) &&
               "Please fill Product Spesification first"}
         </p>
         <p className="text-xs mb-0 p-invalid text-red-500">
            {(!getValues("dc-critical") ||
               !getValues("dc-major") ||
               !getValues("dc-minor")) &&
               "Please fill My Defact Classification first"}
         </p>
         <p className="text-xs mb-0 p-invalid text-red-500">
            {(!getValues("approval_samples") ||
               !getValues("product_samples")) &&
               "Please choose Aproval sample and Production sample"}
         </p>
         <div className="flex gap-2 flex-row-reverse">
            <div>
               <Button
                  onClick={handleSubmit(onSubmit)}
                  loading={loading}
                  label="Submit"
                  className="border-0"
               />
            </div>
            <button
               type="button"
               className="bg-white text-600 border-gray-200 rounded border-1 px-3 py-2 cursor-pointer"
               onClick={onClose}
            >
               Cancel
            </button>
         </div>
      </Dialog>
   );
}
