import React, { useEffect, useState } from "react";
import { TextField } from "../../../gigs/components/TextField";
import { dataToOption } from "../../../../../utils/dataToOptions";
import apiRegions from "../../../../dashboard/productInspection/api/product-inspection/apiRegion";
import { DropdownField } from "../../../gigs/components/DropDown";
import { DateField } from "../DateField";
import { transformToDropdownOptions } from "../../../../../utils/transformToDropdownOptions";
import { useCountries } from "../../../hooks/useCountries";
import { useIDType } from "../../../hooks/useIDType";
// import DatePicker from "react-datepicker";
// import { forwardRef } from "react";

function ResidenceAndBirthday({ control }) {
  const countriesQuery = useCountries()
  const idTypeQuery = useIDType()

  return (
    <section className="drop-shadow bg-white rounded-lg mt-8 border border-gray-500">
      <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
        <h1 className="font-bold text-2xl my-auto">Residence And Birthday</h1>
      </div>
      <div className="flex flex-col gap-4 text-gray-600 text-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            name="residence_birth.address"
            control={control}
            type="string"
            label="Address"
            placeholder="Input address"
            isRequired={true}
          />
          <TextField
            name="residence_birth.address_local_language"
            control={control}
            label="Address in Local Language"
            placeholder="Input address in local language"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <DropdownField
            label="Country"
            placeholder="Select Country"
            name="residence_birth.country_id"
            control={control}
            options={transformToDropdownOptions(
              countriesQuery?.data?.data,
              {
                label: 'name',
                value: 'id'
              }
            )}
          />
          <TextField
            name="residence_birth.province"
            control={control}
            label="Province"
            placeholder="Input province"
            isRequired={true}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            name="residence_birth.city"
            control={control}
            label="City"
            placeholder="Input city"
          />
          <TextField
            name="residence_birth.postal_code"
            control={control}
            label="Postal Code"
            placeholder="Input postal code"
            isRequired={true}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <DateField
            control={control}
            placeholder="Input date"
            label="Date of Birth"
            name="residence_birth.date_of_birth"
          />
          <DropdownField
            name="residence_birth.id_type_id"
            control={control}
            label="ID Type"
            placeholder="National ID"
            options={transformToDropdownOptions(
              idTypeQuery?.data?.data,
              {
                label: 'type',
                value: 'id'
              }
            )}
          />
          <TextField
            name="residence_birth.id_number"
            control={control}
            label="ID Number"
            placeholder="Input ID number"
          />
        </div>
      </div>
    </section>
  );
}

export default ResidenceAndBirthday;