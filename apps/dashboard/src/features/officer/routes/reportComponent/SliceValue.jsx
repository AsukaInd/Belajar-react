import React from 'react'
import { FaRegCheckCircle } from "react-icons/fa"

const SliceValue = ({ name, status, remarks }) => {
    return (
        <div className="flex py-1 text-sm font-semibold items-center" style={{ border: "solid grey", borderWidth: "0px 0px 1px 0px" }}>
            <div className="w-[200px]">{name}</div>
            <div className="flex-1 flex justify-between items-center text-center gap-4">
                <div className="flex-none text-center">
                    {status === "pass" ? (
                        <FaRegCheckCircle
                            className="text-green-400 my-auto mx-auto font-bold"
                            size={24}
                        />
                    ) : null}
                </div>
                <div className="flex-none text-center">
                    {status === "fail" ? (
                        <FaRegCheckCircle
                            className="text-red-400 my-auto mx-auto font-bold"
                            size={24}
                        />
                    ) : null}
                </div>
                <div className="flex-none text-center">
                    {status === "pending" ? (
                        <FaRegCheckCircle
                            className="text-slate-400 my-auto mx-auto font-bold"
                            size={24}
                        />
                    ) : null}
                </div>
                <div className="w-1/3 text-center text-xs font-normal">{remarks || ""}</div>
            </div>
        </div>
    )
}

export default SliceValue