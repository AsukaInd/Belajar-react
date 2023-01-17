import React from "react";
import { TextField } from "../../../gigs/components/TextField";
import { Button } from "primereact/button";
import { DropdownField } from "../../../gigs/components/DropDown";

function FactoryAudit({ control }) {

  return (
    <section className="drop-shadow bg-white rounded-lg mt-8 border border-gray-500">
      <div className="flex flex-col bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
        <h1 className="font-bold text-2xl my-auto">Factory Audit</h1>
        <h1 className="font-thin text-xl my-auto">(on-site audit, quality management system, social responsibility, and anti-terrorism)</h1>
      </div>
      <div className="flex flex-col gap-4 text-gray-600 text-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-4 text-gray-600 gap-4">
            <div className="p-4">
              <p className="mt-2 text-gray-600 font-bold">
                Supplier site evaluation
              </p>
              <div className="flex flex-row">
                <div>
                  <input
                    type="radio"
                    id="production-yes"
                    name="production-sample"
                    defaultValue="yes"
                    defaultChecked=""
                  />
                  <label htmlFor="production-yes">Quality Audit</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="production-no"
                    name="production-sample"
                    defaultValue="No"
                  />
                  <label htmlFor="production-no">GRS/GOTS/RCS/OCS</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="production-no"
                    name="production-sample"
                    defaultValue="No"
                  />
                  <label htmlFor="production-no">GMP/HACCP</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="production-no"
                    name="production-sample"
                    defaultValue="No"
                  />
                  <label htmlFor="production-no">SA8000</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="production-yes"
                    name="production-sample"
                    defaultValue="yes"
                    defaultChecked=""
                  />
                  <label htmlFor="production-yes">SLCP</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="production-yes"
                    name="production-sample"
                    defaultValue="yes"
                    defaultChecked=""
                  />
                  <label htmlFor="production-yes">Sedex</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="production-yes"
                    name="production-sample"
                    defaultValue="yes"
                    defaultChecked=""
                  />
                  <label htmlFor="production-yes">BSCI</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="production-yes"
                    name="production-sample"
                    defaultValue="yes"
                    defaultChecked=""
                  />
                  <label htmlFor="production-yes">WRAP</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="production-yes"
                    name="production-sample"
                    defaultValue="yes"
                    defaultChecked=""
                  />
                  <label htmlFor="production-yes">OBP</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-4 text-gray-600 gap-4">
            <div className="p-4">
              <div className="flex flex-row">
                <div>
                  <input
                    type="radio"
                    id="production-yes"
                    name="production-sample"
                    defaultValue="yes"
                    defaultChecked=""
                  />
                  <label htmlFor="production-yes">FSC</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="production-no"
                    name="production-sample"
                    defaultValue="No"
                  />
                  <label htmlFor="production-no">RBA</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="production-yes"
                    name="production-sample"
                    defaultValue="yes"
                    defaultChecked=""
                  />
                  <label htmlFor="production-yes">The Higg Index</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="production-yes"
                    name="production-sample"
                    defaultValue="yes"
                    defaultChecked=""
                  />
                  <label htmlFor="production-yes">Anti-Terrorism</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="production-yes"
                    name="production-sample"
                    defaultValue="yes"
                    defaultChecked=""
                  />
                  <label htmlFor="production-yes">GSV</label>
                </div>
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
                <div>
                  <input
                    type="radio"
                    id="production-yes"
                    name="production-sample"
                    defaultValue="yes"
                    defaultChecked=""
                  />
                  <label htmlFor="production-yes">Chinese</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="production-no"
                    name="production-sample"
                    defaultValue="No"
                  />
                  <label htmlFor="production-no">English</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FactoryAudit;