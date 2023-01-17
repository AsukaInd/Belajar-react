import { object, string, lazy } from "yup";

export const productSchema = object().shape({
   product_name: string().required("product name is required"),
   po: string().required("Po.no is required"),
   qty_name: string().required("Qty name is required"),
   style_no: string().required("Style no is required"),
   units: string().required("units is required")
});
