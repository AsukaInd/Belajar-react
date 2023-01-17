import { Checkbox } from "primereact/checkbox";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSupervisors } from "~/features/dashboard/facilityManagement/hooks/officer/useSupervisors";

export function SiteFormSpvAssingment({ supervisorSelected, setValue }) {
   const { t } = useTranslation();
   const { status, data, error } = useSupervisors();
   const [selectAll, setSelectAll] = useState(false);

   function isSelected(id) {
      return supervisorSelected.includes(id);
   }

   function handleSelect(id) {
      const filterSelected = supervisorSelected.filter(
         (selectedId) => selectedId === id
      );

      if (filterSelected.length > 0) {
         setValue(
            "supervisor_assignment",
            supervisorSelected.filter((selectedId) => selectedId !== id)
         );
      } else {
         setValue("supervisor_assignment", [...supervisorSelected, id]);
      }
   }

   function handleSelectAll() {
      setValue(
         "supervisor_assignment",
         data?.data.map((supervisor) => supervisor.id)
      );
   }

   return (
      <>
         {status === "loading" ? (
            <h1>loading...</h1>
         ) : status === "success" && data.data.length > 0 ? (
            <table className="site-supervisor-assingment">
               <thead>
                  <tr>
                     <th>
                        <Checkbox
                           checked={selectAll}
                           onChange={(event) => {
                              setSelectAll((prev) => !prev);

                              if (event.target.checked) {
                                 handleSelectAll();
                              } else {
                                 setValue("supervisor_assignment", []);
                              }
                           }}
                        />
                     </th>
                     <th>{t("dashboard.site.supervisor")}</th>
                  </tr>
               </thead>
               <tbody>
                  {data.data.map((supervisor) => {
                     return (
                        <tr key={supervisor.id}>
                           <td>
                              <Checkbox
                                 checked={isSelected(supervisor.id)}
                                 onChange={() => {
                                    handleSelect(supervisor.id);
                                 }}
                              />
                           </td>
                           <td>
                              {supervisor.first_name} {supervisor.last_name}
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         ) : error ? (
            <span>
               {error?.status < 500 ? error.data.message : error?.statusText}
            </span>
         ) : (
            t("common.no-data")
         )}
      </>
   );
}
