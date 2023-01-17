import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Controller } from "react-hook-form";
import { useClients } from "../../hooks/client/useClients";
import { useTranslation } from "react-i18next";
import { InputTextarea } from "primereact/inputtextarea";

export function SiteFormHeader({ control, errors }) {
   const { t } = useTranslation();
   const { status, data } = useClients({ key: "site-form-header" });

   const clientSelectItems =
      status === "success"
         ? data.data.map((client) => ({
              value: client.id,
              label: client?.company_name,
           }))
         : [];

   return (
      <div className="my-2">
         <div className="flex">
            <div className="field mr-4 w-full">
               <label htmlFor="site-name">
                  {t("dashboard.site.select-client")}
               </label>
               <Controller
                  name="client_id"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <Dropdown
                        disabled={status === "loading"}
                        value={Number(field.value)}
                        options={status === "success" ? clientSelectItems : []}
                        onChange={field.onChange}
                        placeholder={t("dashboard.site.select-client")}
                     />
                  )}
               />
               {errors.client_id && t("dashboard.site.client-required")}
            </div>
            <div className="field w-full">
               <label htmlFor="site-name">
                  {t("dashboard.site.site-name")}
               </label>
               <Controller
                  name="site_name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <InputText id="site-name" {...field} />
                  )}
               />
               {errors.site_name && t("dashboard.site.site-name-required")}
            </div>
         </div>
         <div className="flex flex-column">
            <label htmlFor="description">Description</label>
            <br />
            <Controller
               name="description"
               control={control}
               render={({ field }) => (
                  <InputTextarea
                     id="description"
                     rows={5}
                     cols={30}
                     {...field}
                  />
               )}
            />
         </div>
      </div>
   );
}
