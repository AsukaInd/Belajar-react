import { object, string, lazy } from "yup";

export const vendorSchema = object().shape({
   name: string().required("validation.name-required"),
   location: string().required("validation.location-required"),
   description: string().required("validation.description-required"),
});
