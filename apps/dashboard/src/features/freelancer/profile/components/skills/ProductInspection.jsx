import React from "react";
import { TextField } from "../../../gigs/components/TextField";
import { Button } from "primereact/button";
import { DropdownField } from "../../../gigs/components/DropDown";
import { RadioButton } from "../RadioButton";

function ProductInspection({ control, setValue, watch }) {

  const btnActive = 'p-button-primary'

  const btnInactive = 'p-button-raised p-button-text p-button-plain'

  return (
    <section className="drop-shadow bg-white rounded-lg mt-8 border border-gray-500">
      <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
        <h1 className="font-bold text-2xl my-auto">Product Inspection</h1>
      </div>
      <div className="flex flex-col gap-4 text-gray-600 text-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-4 text-gray-600 gap-4">
            <div className="p-4">
              <p className="mt-2 text-gray-600 font-bold">
                Service Type
              </p>
              <div className="flex flex-row">
                <RadioButton
                  control={control}
                  label="Product Insepection"
                  name="services[0].service_type_id"
                  index={1}
                />
                <RadioButton
                  control={control}
                  label="Sample Collection"
                  name="services[0].service_type_id"
                  index={2}
                />
                <RadioButton
                  control={control}
                  label="Production Supervision"
                  name="services[0].service_type_id"
                  index={3}
                />
                <RadioButton
                  control={control}
                  label="Gap Analysis"
                  name="services[0].service_type_id"
                  index={4}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-4 text-gray-600 gap-4">
            <div className="p-4">
              <p className="mt-2 text-gray-600 font-bold">
                Report Language
              </p>
              <div className="flex flex-row">
                <RadioButton
                  control={control}
                  label="Chinese"
                  name="product_inspection.report_language_id"
                  index={1}
                />
                <RadioButton
                  control={control}
                  label="English"
                  name="product_inspection.report_language_id"
                  index={2}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-4 text-gray-600 gap-4">
            <div className="p-4">
              <p className="mt-2 text-gray-600 font-bold">
                Product Line
              </p>
              <Button
                type="button"
                label="Soflines-Textile"
                className={watch('product_inspection.product_line_id') === '1' ? btnActive : btnInactive}
                onClick={() => setValue('product_inspection.product_line_id', '1')}
              />
              <Button
                type="button"
                label="Hardlines"
                className={watch('product_inspection.product_line_id') === '2' ? btnActive : btnInactive}
                onClick={() => setValue('product_inspection.product_line_id', '2')}
              />
              <Button
                type="button"
                label="Electrical & Electronic"
                className={watch('product_inspection.product_line_id') === '3' ? btnActive : btnInactive}
                onClick={() => setValue('product_inspection.product_line_id', '3')}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <DropdownField
            name="product_inspection.sub_product_line_id"
            control={control}
            placeholder="Select"
            options={[{ label: "basic", value: "1" }]}
          />
        </div>
      </div>
    </section>
  );
}

export default ProductInspection;