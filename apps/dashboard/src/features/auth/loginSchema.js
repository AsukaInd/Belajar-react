import { object, string } from "yup";

export const loginSchema = object().shape({
   email: string()
      .email("validation.email-invalid")
      .required("validation.email-required"),
   password: string()
      .min(8, "validation.min-length-8")
      .required("validation.password-required"),
});
