import { object, string, lazy, mixed } from "yup";

export const contactSchema = object().shape({
   first_name: string().required("first name is required"),
   last_name: string().required("last name is required"),
   contact_name: string().required("contact name is required"),
   image: mixed("image is required").required("image is required"),
   phone_number: string().required("phone number is required"),
   email: string().email("email is invalid").required("email is required"),
});
