import React, { useEffect, useState } from "react";
import { Button } from "../../../../../../components/product-inspection/Button";
import { DropdownField } from "../../../../../../components/product-inspection/DropDown";
import { TextField } from "../../../../../../components/product-inspection/TextField";
import { dataToOption } from "../../../../../../utils/dataToOptions";
import apiRegions from "../../../api/product-inspection/apiRegion";
import apiSupplier from "../../../api/product-inspection/apiSupplier";
import { FaUserPlus } from "react-icons/fa";
import { CompanyDialog } from "./CompanyDialog";

function SupplierInformation({ control, setValue }) {
   const [countries, setCountries] = useState([]);
   const [provinces, setProvinces] = useState([]);
   const [cities, setCities] = useState([]);

   const [supplierType, setSupplierType] = useState([]);

   const [companyDialog, setCompanyDialog] = useState(false);

   function openCompanyDialog() {
      setCompanyDialog(true);
   }

   function closeCompanyDialog() {
      setCompanyDialog(false);
   }

   useEffect(() => {
      apiRegions.getCountry().then((res) => {
         const options = dataToOption(res.data.data.data);
         console.log(options);
         setCountries(options);
      });

      apiRegions.getProvince().then((res) => {
         const options = dataToOption(res.data.data.data);
         setProvinces(options);
      });

      apiRegions.getCity().then((res) => {
         const options = dataToOption(res.data.data.data);
         setCities(options);
      });

      apiSupplier.type().then((res) => {
         const options = dataToOption(res.data.data.data);
         setSupplierType(options);
      });
   }, []);

   return (
      <section className="drop-shadow bg-white rounded-lg mt-8 border border-gray-500">
         <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
            <h1 className="font-bold text-2xl my-auto">Supplier Information</h1>
            <Button
               className="bg-blue-2"
               label="Select Supplier"
               icon={<FaUserPlus />}
               onClick={openCompanyDialog}
            />
         </div>
         <div className="flex flex-col gap-4 text-gray-600 text-lg p-4">
            <div className="flex flex-col md:flex-row gap-4">
               {/* <TextField
                  name="si-name"
                  control={control}
                  label="Name in local language"
                  placeholder="Input name in local language"
                  isRequired
               /> */}
               <TextField
                  disable
                  name="si-company"
                  control={control}
                  type="string"
                  label="Company Name"
                  placeholder="Input company name"
                  // isRequired
               />
               <TextField
                  disable
                  name="si-phone"
                  control={control}
                  label="Phone Number"
                  placeholder="Input phone number"
                  // isRequired
               />
               {/* <TextField
                  name="si-email"
                  control={control}
                  label="Email Address"
                  placeholder="Input email"
               /> */}
            </div>
            {/* <div className="flex flex-col md:flex-row gap-4">
               <TextField
                  disable
                  name="si-address"
                  control={control}
                  label="Address"
                  placeholder="Input address"
                  // isRequired
               />
               <TextField
                  disable
                  name="si-address_local"
                  control={control}
                  label="Address in Local Language"
                  placeholder="Input phone adress"
                  // isRequired
               />
            </div> */}
            <div className="flex flex-col md:flex-row gap-4">
               <DropdownField
                  disable
                  label="Country"
                  placeholder="Select Country"
                  name="si-country_id"
                  control={control}
                  options={countries}
                  // isRequired
               />
               <DropdownField
                  disable
                  label="Province"
                  placeholder="Select Province"
                  name="si-province_id"
                  control={control}
                  options={provinces}
                  // isRequired
               />
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-1/2">
               <DropdownField
                  disable
                  label="City"
                  placeholder="Select City"
                  name="si-city_id"
                  control={control}
                  options={cities}
                  className="w-1/2"
                  // isRequired
               />
               {/* <TextField
                  disable
                  name="si-postal_code"
                  control={control}
                  label="ZIP Postal Code"
                  placeholder="Input postal code"
                  // isRequired
               /> */}
            </div>
            {/* <div className="flex flex-col md:flex-row gap-4">
               <DropdownField
                  disable
                  label="Industry Type"
                  placeholder="Select Industri Type"
                  name="si-industry_type_id"
                  control={control}
                  options={[{ label: "indonesia", value: 1 }]}
                  // isRequired
               />
               <DropdownField
                  disable
                  label="Supplier Type"
                  placeholder="Select Supplier Type"
                  name="si-supplier_type_id"
                  control={control}
                  options={supplierType}
                  // isRequired
               />
            </div> */}
         </div>

         <CompanyDialog
            isOpen={companyDialog}
            onClose={closeCompanyDialog}
            isSupplier
            setValue={setValue}
         />
      </section>
   );
}

export default SupplierInformation;
