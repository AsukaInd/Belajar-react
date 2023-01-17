import { object, string } from "yup";

export const hostSchema = object().shape({
   first_name: string().required("validation.first-name-required"),
   last_name: string().required("validation.last-name-required"),
   company: string().required("validation.company-required"),
   email: string()
      .email("validation.email-invalid")
      .required("validation.email-required"),
   site_id: string().required("validation.site-required"),
});
