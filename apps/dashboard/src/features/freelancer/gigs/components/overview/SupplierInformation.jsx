import React from "react";
import { transformToDropdownOptions } from "../../../../../utils/transformToDropdownOptions";
import { useCategories } from "../../../hooks/useCategories";
import { useSubCategories } from "../../../hooks/useSubCategories";
import { DropdownField } from "../DropDown";
import { TextField } from "../TextField";

function SupplierInformation({ control }) {

  const categoriesQuery = useCategories()
  const subCategoriesQuery = useSubCategories()

  return (
    <section className="drop-shadow bg-white rounded-lg mt-8 border border-gray-500">
      <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
        <h1 className="font-bold text-2xl my-auto">Supplier Information</h1>
      </div>
      <div className="flex flex-col gap-4 text-gray-600 text-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            name="title"
            control={control}
            type="string"
            label="Gigs Title"
            placeholder="I will be your sourcing in China"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            name="seo_title"
            control={control}
            label="SEO Title"
            placeholder="Be your sourcing in China"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <DropdownField
            name="category_id"
            control={control}
            label="Select Category"
            placeholder="Option 1"
            options={transformToDropdownOptions(
              categoriesQuery?.data?.data,
              {
                label: 'name_category',
                value: 'id'
              }
            )}
          />
          <DropdownField
            name="sub_category_id"
            control={control}
            label="Select Sub Category"
            placeholder="Option 1"
            options={
              subCategoriesQuery?.data?.data?.length > 0
                ? transformToDropdownOptions(
                  subCategoriesQuery?.data?.data,
                  {
                    label: 'name_sub_category',
                    value: 'id'
                  }
                )
                : [{ label: 'sub category 1', value: '1' }]
            }
          />
          {/* <DropdownField
            name="job_type_id"
            control={control}
            label="Job Type"
            isRequired={true}
            placeholder="Option 1"
            options={[{ label: 'job 1', value: 1 }, { label: 'job 2', value: 2 }]}
          /> */}
        </div>
      </div>
    </section>
  );
}

export default SupplierInformation;
