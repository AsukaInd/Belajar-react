import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";
import { useHosts } from "~/features/officer/hooks/useHosts";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export default function PreregisterVisitor() {
   const { t } = useTranslation();
   const navigate = useNavigate();
   const [search, setSearch] = useState("");
   const [selected, setSelected] = useState(null);
   const { siteId } = useParams();
   const { status, data } = useHosts({ siteId });

   const filterHost = data?.data.filter((host) => {
      const name = `${host.first_name} ${host.last_name}`;
      return name.toLowerCase().includes(search.toLowerCase());
   });

   return (
      <>
         <div className="pages-body flex flex-column my-4">
            <div className="align-self-center mt-auto mb-auto">
               <div className="flex flex-column mb-4">
                  <div className="flex flex-column">
                     <label htmlFor="search-host">Enter host name</label>
                     <InputText
                        className="mt-3"
                        id="search-host"
                        placeholder="Search host"
                        value={search}
                        onChange={(e) => {
                           setSearch(e.target.value);
                           setSelected(null);
                        }}
                     />
                  </div>
                  {!selected ? (
                     <div className="mt-3">
                        {
                           status === 'loading'
                              ? <span>Loading...</span>
                              : status === 'success'
                              ? filterHost.map((host) => (
                                   <div
                                      key={host.id}
                                      className="flex justify-content-between align-items-center mb-3"
                                   >
                                      <p className="mb-0">
                                         {host.first_name} {host.last_name}
                                      </p>
                                      <Button
                                         label="Select"
                                         onClick={() => {
                                            setSelected(host);
                                            setSearch(
                                               `${host.first_name} ${host.last_name}`
                                            );
                                         }}
                                      />
                                   </div>
                                ))
                              : <span>Error</span>
                        }
                     </div>
                  ) : (
                     <div className="mt-3 flex flex-column text-center">
                        <h1>
                           {selected.first_name} {selected.last_name}
                        </h1>
                        <Button
                           onClick={() => navigate(`${selected.id}/visitors`)}
                           label="Next"
                        />
                     </div>
                  )}
               </div>
            </div>
         </div>
      </>
   );
}
