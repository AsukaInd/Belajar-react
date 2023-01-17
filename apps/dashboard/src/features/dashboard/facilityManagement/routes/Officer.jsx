import { Toolbar } from "primereact/toolbar";
import { AddOfficerDialog } from "../officer/AddOfficerDialog";
import { useState } from "react";
import { Button } from "primereact/button";
import { OfficerTable } from "../officer/OfficerTable";

export default function OfficerPage() {
   const [newOfficerDialog, setNewOfficerDialog] = useState(false);

   function closeNewOfficerDialog() {
      setNewOfficerDialog(false);
   }

   function openNewOfficerDialog() {
      setNewOfficerDialog(true);
   }

   return (
      <>
         <div className="layout-content">
            <Toolbar
               className="mb-4"
               left={
                  <div className="my-2">
                     <Button
                        label="add officer"
                        className="mr-2"
                        onClick={openNewOfficerDialog}
                     />
                  </div>
               }
            />
            <OfficerTable />
         </div>
         <AddOfficerDialog
            isOpen={newOfficerDialog}
            onClose={closeNewOfficerDialog}
         />
      </>
   );
}
