import { object, string } from "yup";

export const inviteNewUserSchema = object().shape({
   email: string().required("validation.email-required"),
});
