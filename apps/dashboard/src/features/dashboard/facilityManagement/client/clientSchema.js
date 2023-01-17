import { object, string, lazy } from "yup";

export const clientSchema = object().shape({
   email: string()
      .email("validation.email-invalid")
      .required("validation.email-required"),
   company_name: string().required("validation.company-name-required"),
   address: string().required("validation.address-required"),
   country: lazy((val) => {
      return typeof val === "object" && val !== null
         ? object({
              name: string().required("validation.country-required"),
           })
         : string().required("validation.country-required");
   }),
   city: string().required("validation.city-required"),
   industry_type: string().required("validation.industry-type-required"),
   state: string().required("validation.state-required"),
   postal_code: string().required("validation.postal-code-required"),
   supplier_type: string().required("validation.supplier-type-required"),
   phone: string().required("validation.phone-required"),
   // profile_image: string().required("validation.profile-image-required"),
});
