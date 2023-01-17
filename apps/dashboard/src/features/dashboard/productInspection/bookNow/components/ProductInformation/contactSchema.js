import { object, string, lazy } from "yup";

export const assetSchema = object().shape({
   name: string().required("validation.name-required"),
   location: string().required("validation.location-required"),
   type: string().required("validation.type-required"),
   assign_to: string().required("validation.assign-to-required"),
   vendor_id: string().required("validation.vendor-required"),
});
