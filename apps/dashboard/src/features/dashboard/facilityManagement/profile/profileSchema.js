import { object, string } from "yup";

export const profileSchema = object().shape({
   email: string()
      .email("validation.email-invalid")
      .required("validation.email-required"),
   company: string().required("validation.company-name-required"),
});
