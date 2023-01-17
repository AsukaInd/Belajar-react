import { object, string } from "yup";

export const registerSchema = object().shape({
   email: string()
      .email("validation.email-invalid")
      .required("validation.email-required"),
   name: string().required("validation.name-required"),
   username: string().required("validation.username-required"),
   password: string()
      .min(8, "validation.min-length-8")
      .required("validation.password-required"),
});

export const freelancerRegisterSchema = object().shape({
   email: string()
      .email("validation.email-invalid")
      .required("validation.email-required"),
   username: string().required("validation.username-required"),
   password: string()
      .min(8, "validation.min-length-8")
      .required("validation.password-required"),
});
