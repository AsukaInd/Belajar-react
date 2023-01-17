import { useState } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { AppTopbar } from "~/features/dashboard/layout/AppTopbar";
import { IconBuildingFour } from "~/components/icons/IconBuildingFour";
import { ProgressSpinner } from "primereact/progressspinner";
import { ErrorMessage } from "~/components/ErrorMessage";
import { Divider } from 'primereact/divider';
import { HostTable } from "../host/HostTable";
import { AddHostDialog } from "../host/AddHostDialog";
import { useHosts } from "../hooks/host/useHosts";

export default function SitePage() {
   const [newHostDialog, setNewSiteDialog] = useState(false);
   const [rowSelection, setRowSelection] = useState({});

   const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

   const { status, data, error } = useHosts({
      perPage: pageSize,
      page: pageIndex,
   });


   function closeNewHostDialog() {
      setNewSiteDialog(false);
   }

   function openNewHostDialog() {
      setNewSiteDialog(true);
   }

   return (
      <>
         <AppTopbar
            left={<h1 className="top-bar-title">Host Setup</h1>}
         />
         <div className="layout-content mb-0">
            <div>
               <Toolbar
                  left={
                     <h1 className="mb-0" style={{ fontSize: "18px" }}>
                        List of Hosts
                     </h1>
                  }
                  right={
                     <div>
                        <Button
                           icon={<IconBuildingFour className="mr-3" />}
                           label="New Host"
                           onClick={openNewHostDialog}
                        />
                     </div>
                  }
               />
               <Divider className="mt-2" />
            </div>
         </div>
         {
            status === 'loading'
               ? (
                  <div className="vh-center">
                     <ProgressSpinner strokeWidth={3} />
                  </div>
               )
               : status === 'success'
                  ? (
                     <div className="layout-content mt-0">
                        <HostTable
                           data={data}
                           rowSelection={rowSelection}
                           setRowSelection={setRowSelection}
                           pageIndex={pageIndex}
                           pageSize={pageSize}
                           setPagination={setPagination}
                           pageCount={data?.last_page}
                           from={data?.from}
                           to={data?.to}
                        />
                     </div>
                  )
                  : <ErrorMessage className="vh-center" error={error} />
         }
         <AddHostDialog isOpen={newHostDialog} onClose={closeNewHostDialog} />
      </>
   );
}
