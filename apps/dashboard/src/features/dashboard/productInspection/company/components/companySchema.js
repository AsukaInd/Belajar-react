import { object, string, lazy } from "yup";

export const assetSchema = object().shape({
   company_name: string().required("company name is required"),
   company_type: string().required("company type is required"),
   country_id: string().required("country is required"),
   province_id: string().required("province is required"),
   city_id: string().required("city is required"),
   owner_name: string().required("owner name is required"),
   contact_name: string().required("contact name required"),
   phone_number: string().required("phone number is required"),
   email: string().email("email is invalid").required("email is required"),
});
