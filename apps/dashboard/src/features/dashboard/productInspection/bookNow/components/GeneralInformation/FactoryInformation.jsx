import React, { useEffect, useState } from "react";
import { Button } from "../../../../../../components/product-inspection/Button";
import { DropdownField } from "../../../../../../components/product-inspection/DropDown";
import { TextField } from "../../../../../../components/product-inspection/TextField";
import { dataToOption } from "../../../../../../utils/dataToOptions";
import apiRegions from "../../../api/product-inspection/apiRegion";
import apiSupplier from "../../../api/product-inspection/apiSupplier";
import { CompanyDialog } from "./CompanyDialog";
import { FaUserPlus } from "react-icons/fa";

function FactoryInformation({ control, setValue }) {
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
      <section className="drop-shadow bg-white rounded-lg mt-6 border border-gray-500">
         <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
            <h1 className="font-bold text-2xl my-auto">Factory Information</h1>
            <Button
               className="bg-blue-2"
               label="Select Factory"
               icon={<FaUserPlus />}
               onClick={openCompanyDialog}
            />
         </div>
         <div className="flex flex-col gap-4 text-gray-600 text-lg p-4">
            <div className="flex flex-col md:flex-row gap-4">
               <TextField
                  name="fi-company_name"
                  control={control}
                  type="string"
                  label="Company Name"
                  placeholder="Input company name"
                  // isRequired={true}
                  disable
               />
               <TextField
                  disable
                  name="fi-phone"
                  control={control}
                  label="Phone Number"
                  placeholder="Input phone number"
                  // isRequired
               />
            </div>

            {/* <div className="flex flex-col md:flex-row gap-4">
               <TextField
                  name="fi-address_factory"
                  control={control}
                  label="Address"
                  placeholder="Input address in local"
                  disable
               />
               <TextField
                  name="fi-address_factory_local"
                  control={control}
                  label="Address in Local Language"
                  placeholder="Input address in local"
                  disable
               />
            </div> */}
            <div className="flex flex-col md:flex-row gap-4">
               <DropdownField
                  label="Country"
                  placeholder="Select Country"
                  name="fi-country_id"
                  control={control}
                  options={countries}
                  disable
               />
               <DropdownField
                  label="Province"
                  placeholder="Select Province"
                  name="fi-province_id"
                  control={control}
                  options={provinces}
                  disable
               />
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-1/2">
               <DropdownField
                  label="City"
                  placeholder="Select City"
                  name="fi-city_id"
                  control={control}
                  options={cities}
                  disable
               />
               {/* <TextField
                  name="fi-postal_code"
                  control={control}
                  label="ZIP Postal Code"
                  placeholder="Input postal code"
                  disable
               /> */}
            </div>
         </div>

         <CompanyDialog
            isOpen={companyDialog}
            onClose={closeCompanyDialog}
            setValue={setValue}
         />
      </section>
   );
}

export default FactoryInformation;
