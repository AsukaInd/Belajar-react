import React, { useState } from "react";

import { TextField } from "../../../../../components/product-inspection/TextField";

export default function Inspection({ control }) {
    const [anotherInspection, setAnotherInspection] = useState(1)

    const handleAddInspection = (param) => {
        if (param === 'add') {
            setAnotherInspection(prev => prev + 1)
        } else if (param === 'remove') {
            if (anotherInspection === 1) {
                return anotherInspection
            } else {
                setAnotherInspection(prev => prev - 1)
            }
        }
    }

    const generateAnotherInspection = () => {
        const forms = Array.from(Array(anotherInspection).keys()).map((number) => {
            return (
                <tr key={number}>
                    <td>
                        <TextField
                            name="inspector"
                            control={control}
                            label=""
                        />
                    </td>
                    <td>
                        <TextField
                            name="inspection_date"
                            type="date"
                            control={control}
                            label=""
                        />
                    </td>
                    <td>
                        <TextField
                            name="inspection_address"
                            control={control}
                            label=""
                        />
                    </td>
                    <td>
                        <div className="w-full flex items-center justify-center">
                            -
                        </div>
                    </td>
                    <td>
                        <div className="flex justify-center items-center h-full w-full">
                            <i className="pi pi-times hover:text-red-500 cursor-pointer"
                                onClick={() => handleAddInspection("remove")}
                            ></i>
                        </div>
                    </td>
                </tr>
            )
        })
        return forms
    }

    return (
        <div>
            <div className="bg-blue-1 w-full text-white p-2 rounded">
                Inspections
            </div>
            <div className="flex mt-4 gap-4">
               <table className="table-auto flex-1">
                  <thead>
                     <tr>
                        <th>Inspector</th>
                        <th>Inspection Date</th>
                        <th>Inspection Address</th>
                        <th>Checklist Template</th>
                        <th>Delete</th>
                     </tr>
                  </thead>
                  <tbody>
                     {generateAnotherInspection()}
                  </tbody>
               </table>
            </div>
            <div className="mt-2">
               <button
                  onClick={() => handleAddInspection("add")}
                  className="flex gap-2 bg-blue-500 border-0 hover:bg-blue-700 text-white rounded px-4 py-3 font-bold cursor-pointer"
               >
                  <i className="pi pi-plus" ></i>
                  <span>Add another inspection order</span>
               </button>
            </div>
        </div>
    );
}
