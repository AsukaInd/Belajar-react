import React from "react";
import { DropdownField } from "../DropDown";
import { TextField } from "../TextField";
import { TextArea } from "../TextArea";
import Checkboxes from "../Checkbox";

function ScopeAndPricing({ control }) {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <section className="drop-shadow bg-white rounded-lg mt-8 border border-gray-500">
      <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
        <h1 className="font-bold text-2xl my-auto">Scope and Pricing</h1>
      </div>
      <div className="flex flex-col gap-4 text-gray-600 text-lg p-4 overflow-x-auto">
        <div className="flex flex-col md:flex-row gap-40">
          <div className="flex flex-col md:flex-col gap-1">
            <p className="font-bold text-lg my-3">Price in USD</p>
            <p className="font-bold text-lg p-3 text-gray-700 mt-1 mx-3">Packages</p>
            <p className="font-bold text-lg p-3 text-gray-700 mt-1 mx-3"></p>
            <p className="font-bold text-lg p-3 text-gray-700 mt-1 mx-3"></p>
            <p className="font-bold text-lg p-3 text-gray-700 mt-1 mx-3"></p>
            <p className="font-bold text-lg p-3 text-gray-700 mt-1 mx-3">Description</p>
            <p className="font-bold text-lg p-3 text-gray-700 mt-1 mx-3">Title</p>
          </div>
          <div className="flex flex-col md:flex-col gap-1">
            <TextField
              name="package_gigs[0].price_package"
              control={control}
              type="string"
              placeholder="Package Price"
            />
            <p className="font-bold text-lg p-3 text-gray-700 mt-1 mx-3">Basic</p>
            <TextField
              name="package_gigs[0].name_package"
              control={control}
              placeholder="Name Your Package"
            />
            <TextArea
              control={control}
              rows={4}
              name="package_gigs[0].description"
              placeholder="Describe the details of your package offering"
            />
          </div>

          <div className="flex flex-col md:flex-col gap-1">
            <TextField
              name="package_gigs[1].price_package"
              control={control}
              type="string"
              placeholder="Package Price"
            />
            <p className="font-bold text-lg p-3 text-gray-700 mt-1 mx-3">Standard</p>
            <TextField
              name="package_gigs[1].name_package"
              control={control}
              placeholder="Name Your Package"
            />
            <TextArea
              control={control}
              rows={4}
              name="package_gigs[1].description"
              placeholder="Describe the details of your package offering"
            />
          </div>

          <div className="flex flex-col md:flex-col gap-1">
            <TextField
              name="package_gigs[2].price_package"
              control={control}
              type="string"
              placeholder="Package Price"
            />
            <p className="font-bold text-lg p-3 text-gray-700 mt-1 mx-3">Premium</p>
            <TextField
              name="package_gigs[2].name_package"
              control={control}
              placeholder="Name Your Package"
            />
            <TextArea
              control={control}
              rows={4}
              name="package_gigs[2].description"
              placeholder="Describe the details of your package offering"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-1">
          <TextField
            name="title"
            control={control}
            placeholder="I will to product inspection in China"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-1">
          <TextArea
            control={control}
            rows={4}
            name="description"
            placeholder="Description your package offering"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-40">
          <div className="flex flex-col md:flex-col gap-1">
            <p className="font-bold text-lg p-3 text-gray-700 mt-1 mx-3">Delivery Time</p>
            <p className="font-bold text-lg p-3 text-gray-700 mt-1 mx-3">Source File</p>
            <p className="font-bold text-lg p-3 text-gray-700 mt-1 mx-3">Sourcing Strategy</p>
            <p className="font-bold text-lg p-3 text-gray-700 mt-1 mx-3">Budget Analysis</p>
            <p className="font-bold text-lg p-3 text-gray-700 mt-1 mx-3">Commercial Use</p>
          </div>
          <div className="flex flex-col md:flex-col gap-1">
            <DropdownField
              // label="Industry Type"
              placeholder="Option 1"
              name="package_gigs[0].delivery_time"
              control={control}
              options={[{ label: "1", value: "1" }]}
            />
            <Checkboxes
              name="package_gigs[0].scope_package_gigs[0].scope_is_true"
              control={control}
            />
            <Checkboxes
              name="package_gigs[0].scope_package_gigs[1].scope_is_true"
              control={control}
            />
            <Checkboxes
              name="package_gigs[0].scope_package_gigs[2].scope_is_true"
              control={control}
            />
            <Checkboxes
              name="package_gigs[0].scope_package_gigs[3].scope_is_true"
              control={control}
            />
          </div>
          <div className="flex flex-col md:flex-col gap-1">
            <DropdownField
              // label="Industry Type"
              placeholder="Option 1"
              name="package_gigs[1].delivery_time"
              control={control}
              options={[{ label: "1", value: "1" }]}
            />
            <Checkboxes
              name="package_gigs[1].scope_package_gigs[0].scope_is_true"
              control={control}
            />
            <Checkboxes
              name="package_gigs[1].scope_package_gigs[1].scope_is_true"
              control={control}
            />
            <Checkboxes
              name="package_gigs[1].scope_package_gigs[2].scope_is_true"
              control={control}
            />
            <Checkboxes
              name="package_gigs[1].scope_package_gigs[3].scope_is_true"
              control={control}
            />
          </div>
          <div className="flex flex-col md:flex-col gap-1">
            <DropdownField
              // label="Industry Type"
              placeholder="Option 1"
              name="package_gigs[2].delivery_time"
              control={control}
              options={[{ label: "1", value: "1" }]}
            />
            <Checkboxes
              name="package_gigs[2].scope_package_gigs[0].scope_is_true"
              control={control}
            />
            <Checkboxes
              name="package_gigs[2].scope_package_gigs[1].scope_is_true"
              control={control}
            />
            <Checkboxes
              name="package_gigs[2].scope_package_gigs[2].scope_is_true"
              control={control}
            />
            <Checkboxes
              name="package_gigs[2].scope_package_gigs[3].scope_is_true"
              control={control}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScopeAndPricing;
