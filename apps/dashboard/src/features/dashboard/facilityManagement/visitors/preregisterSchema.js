import { object, string } from "yup";

export const preregisterSchema = object().shape({
   email: string()
      .email("validation.email-invalid")
      .required("validation.email-required"),
   first_name: string().required("validation.first-name-required"),
   last_name: string().required("validation.last-name-required"),
   phone: string().required("validation.phone-required"),
   host_id: string().required("validation.host-required"),
   site_id: string().required("validation.site-required"),
   company: string().required("validation.company-required"),
   start_date: string()
      .nullable(false)
      .required("validation.start-date-required"),
   end_date: string().nullable(false).required("validation.end-date-required"),
});