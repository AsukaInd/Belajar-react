import { object, string, lazy } from "yup";

export const siteSchema = object().shape({
   // client_id: string().required("validation.client-required"),
   site_name: string().required("validation.site-name-required"),
   state: lazy((val) => {
      return typeof val === "object" && val !== null
         ? object({
            name: string().required("validation.state-required"),
         })
         : string().required("validation.state-required");
   }),
   city: string().required("validation.city-required"),
   country: lazy((val) => {
      return typeof val === "object" && val !== null
         ? object({
            name: string().required("validation.country-required"),
         })
         : string().required("validation.country-required");
   }),
});
