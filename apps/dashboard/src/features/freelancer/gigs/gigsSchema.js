import { object, string, lazy } from "yup";

export const gigsSchema = object().shape({
   title: string().required("validation.title-required"),
   seo_title: string().required("validation.seo-title-required"),
   description: string().required("validation.description-required"),
   package_gig: [
      {
         level_package: string().required("validation.level-package-required"),
         name_package: string().required("validation.name-package-required"),
         description: string().required(
            "validation.description-package-required"
         ),
         price_package: string().required("validation.price-package-required"),
      },
   ],
   faqs_gigs: [
      {
         project_detail_name: string().required(
            "validation.project-name-required"
         ),
         description_faq: string().required(
            "validation.description-faq-required"
         ),
      },
   ],
});
