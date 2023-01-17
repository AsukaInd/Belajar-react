import { object, string } from "yup";

export const visitorSchema = object().shape({
    first_name: string().required("validation.first-name-required"),
    last_name: string().required("validation.last-name-required"),
    type_id: string().required("validation.type-id-required"),
    destination: string().required("validation.destination-required"),
});
