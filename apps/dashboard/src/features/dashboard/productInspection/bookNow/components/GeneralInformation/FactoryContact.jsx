import React, { useState } from "react";
import { Button } from "../../../../../../components/product-inspection/Button";
import { TextField } from "../../../../../../components/product-inspection/TextField";
import { ContactDialog } from "./ContactDialog";
import { FaUserPlus } from "react-icons/fa";

function FactoryContact({ control, setValue }) {

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
            <h1 className="font-bold text-2xl my-auto">Factory Contact</h1>
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
                  name="fc-firstname"
                  control={control}
                  type="string"
                  label="First Name"
                  placeholder="Input First Name"
                  disable
                  // isRequired
               />
               <TextField
                  name="fc-lastname"
                  control={control}
                  label="Last Name"
                  placeholder="Input Last Name"
                  disable
               />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
               <TextField
                  name="fc-name_local"
                  control={control}
                  label="Name Local"
                  placeholder="Input name local"
                  disable
               />
               <TextField
                  name="fc-phone"
                  control={control}
                  label="Telephone Number"
                  placeholder="Input telepon number"
                  disable
                  // isRequired=
               />
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-1/2">
               <TextField
                  name="fc-email"
                  control={control}
                  label="Email Address"
                  placeholder="Input email"
                  disable
               />
               {/* <TextField
                  name="fc-mobile"
                  control={control}
                  label="Mobile"
                  placeholder="Input mobile phone"
                  disable
                  // isRequired=
               /> */}
            </div>
         </div>
         <ContactDialog isOpen={contactDialog} onClose={closeContactDialog} setValue={setValue} />
      </section>
   );
}

export default FactoryContact
