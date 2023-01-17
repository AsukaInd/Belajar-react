import React from "react";
import { TextField } from "../../../gigs/components/TextField";

function NameAndContract({ control }) {

  return (
    <section className="drop-shadow bg-white rounded-lg mt-8 border border-gray-500">
      <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
        <h1 className="font-bold text-2xl my-auto">Name and Contract</h1>
      </div>
      <div className="flex flex-col gap-4 text-gray-600 text-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            name="first_name"
            control={control}
            type="string"
            label="First Name"
            placeholder="Input first name"
            isRequired={true}
          />
          <TextField
            name="last_name"
            control={control}
            label="Last Name"
            placeholder="Input last name"
            isRequired={true}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            name="name_in_local"
            control={control}
            label="Name in Local Language"
            placeholder="Input address"
          />
          <TextField
            name="email"
            control={control}
            label="Email Address"
            placeholder="Input email address"
            isRequired={true}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            name="phone_number"
            control={control}
            label="Phone"
            placeholder="Input phone number"
            isRequired={true}
          />
          <TextField
            name="mobile_number"
            control={control}
            label="Mobile"
            placeholder="Input mobile number"
            isRequired={true}
          />
        </div>
      </div>
    </section>
  );
}

export default NameAndContract;