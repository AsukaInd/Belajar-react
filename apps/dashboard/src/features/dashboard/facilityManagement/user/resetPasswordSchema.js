import { object, string, ref } from "yup";

export const resetPasswordSchema = object().shape({
   old_password: string()
      .min(8, "validation.min-length-8")
      .required("validation.password-required"),
   new_password: string()
      .min(8, "validation.min-length-8")
      .required("validation.password-required"),
   new_password_confirmation: string()
      .oneOf([ref("new_password"), null], "validation.passwords-must-match")
      .required("validation.password-confirmation-required"),
});
