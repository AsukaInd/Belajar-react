import React, { useState } from "react";
import { TextField } from "../../../../../../components/product-inspection/TextField";
import { ContactDialog } from "./ContactDialog";
import { FaUserPlus } from "react-icons/fa";
import { Button } from "../../../../../../components/product-inspection/Button";

function SupplierContact({ control, setValue }) {

   const [contactDialog, setContactDialog] = useState(false);

   function openContactDialog() {
      setContactDialog(true);
   }

   function closeContactDialog() {
      setContactDialog(false);
   }
   return (
      <section className="drop-shadow bg-white rounded-lg mt-6 border border-gray-500">
         <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
            <h1 className="font-bold text-2xl my-auto">Supplier Contact</h1>
            <Button
               className="bg-blue-2"
               label="Select Contact"
               icon={<FaUserPlus />}
               onClick={openContactDialog}
            />
         </div>
         <div className="flex flex-col gap-4 text-gray-600 text-lg p-4">
            <div className="flex flex-col md:flex-row gap-4">
               <TextField
                  name="sc-firstname"
                  control={control}
                  type="string"
                  label="First Name"
                  placeholder="Input First Name"
                  disable
                  // isRequired
               />
               <TextField
                  name="sc-lastname"
                  control={control}
                  label="Last Name"
                  placeholder="Input Last Name"
                  disable
                  // isRequired
               />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
               <TextField
                  name="sc-name_local"
                  control={control}
                  label="Name Local"
                  placeholder="Input name local"
                  disable
                  // isRequired
               />
               <TextField
                  name="sc-phone_supplier"
                  control={control}
                  label="Phone Number"
                  placeholder="Input telepon number"
                  disable
                  // isRequired
               />
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-1/2">
               <TextField
                  name="sc-email"
                  control={control}
                  label="Email Address"
                  placeholder="Input email"
                  disable
                  // isRequired
               />
               {/* <TextField
                  name="sc-mobile"
                  control={control}
                  label="Mobile"
                  placeholder="Input mobile phone"
                  disable
                  // isRequired
               /> */}
            </div>
         </div>

         <ContactDialog isOpen={contactDialog} onClose={closeContactDialog} isSupplier setValue={setValue} />
      </section>
   );
}

export default SupplierContact
