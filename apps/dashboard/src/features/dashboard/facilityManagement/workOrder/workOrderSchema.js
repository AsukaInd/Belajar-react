import { object, string, lazy } from "yup";

export const workOrderSchema = object().shape({
   name: string().required("validation.name-required"),
   assigned_to: string().required("validation.assign-to-required"),
   due_date: string().required("validation.due-date-required"),
   description: string().required("validation.description-required"),
   site_id: string().required("validation.site-required"),
});
