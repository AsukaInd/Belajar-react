import React from "react";
import { TextField } from "../TextField";
import { TextArea } from "../TextArea";

function FaqsField({ control }) {

  return (
    <section className="drop-shadow bg-white rounded-lg mt-8 border border-gray-500">
      <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
        <h1 className="font-bold text-2xl my-auto">Supplier Information</h1>
      </div>
      <div className="flex flex-col gap-4 text-gray-600 text-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            name="faqs_gigs[0].project_detail_name"
            control={control}
            type="string"
            placeholder="Question..."
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <TextArea
            name="faqs_gigs[0].description_faq"
            control={control}
            type="string"
            placeholder="Answer..."
            rows={5}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            name="faqs_gigs[1].project_detail_name"
            control={control}
            type="string"
            placeholder="Question..."
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <TextArea
            name="faqs_gigs[1].description_faq"
            control={control}
            type="string"
            placeholder="Answer..."
            rows={5}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            name="faqs_gigs[2].project_detail_name"
            control={control}
            type="string"
            placeholder="Question..."
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <TextArea
            name="faqs_gigs[2].description_faq"
            control={control}
            type="string"
            placeholder="Answer..."
            rows={5}
          />
        </div>
      </div>
    </section>
  );
}

export default FaqsField;