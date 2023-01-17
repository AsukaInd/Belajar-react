import { object, string } from "yup";

export const tourStopSchema = object().shape({
   site_id: string().required("validation.client-required"),
   name: string().required("validation.tour-stop-name-required"),
   description: string().required("validation.description-required"),
});
