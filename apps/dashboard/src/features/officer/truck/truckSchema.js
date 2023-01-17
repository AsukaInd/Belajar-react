import { object, string } from "yup";

export const truckSchema = object().shape({
    driver: string().required("validation.name-required"),
    company: string().required("validation.company-required"),
});
