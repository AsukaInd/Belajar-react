import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import apiServices from "../../api/services/apiServices";
import { RegularButton } from "../../../../../components/product-inspection/Button";
import { FiUpload } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams , useLocation , Route, Link, Routes, useParams } from "react-router-dom";




function AddEditService() {
   const params = useParams();
   const [AddEditDialog, setAddEditDialog] = useState(false);
   const [isEdit, setIsEdit] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [selected, setSelected] = useState(null);
   const [renderData, setRenderData] = useState(false);
   const { register, handleSubmit, setValue } = useForm();
   const [imgPreview, setImagePreview] = useState(null);
   const [file, setFile] = useState();
   const [error, setError] = useState();

   useEffect(() => {
      const id = params.id;
      const getData = async () => {
         await apiServices.view(id).then((res) => {
            const data = res.data.data;
            console.log(res.data.data);
            setValue("name", data.name);
            setValue("desc", data.desc);
         });
      };
      if (id !== "new") {
         getData();
      }
   }, []);

   const onSubmit = async (req) => {
      console.log(req);
      const data = new FormData();
      data.append("name", req.name);
      data.append("desc", req.desc);
      setImagePreview()
      if (file) {
         data.append("photo", file);
      }
      console.log(data);
      for (const key of data.entries()) {
         console.log(key[0] + ", " + key[1]);
      }
      if (params.id !== "new") {
         data.append("_method", "PUT");
         await apiServices.updateData(params.id, data).then(() => {
            window.location.href = "/admin/services";
         })
         .catch((err) => setError(err.response.data.data));;
      } else {
         await apiServices
            .addData(data)
            .then((res) => {
               toast.success("Successfully");
               window.location.href = "/admin/services";
            })
            .catch((err) => setError(err.response.data.data));
      }
   };

   const chooseImage = (e) => {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
      setError("");
   };

   return (
      <div className="layout-content">
         <h4 className="text-blue-700">Add Service</h4>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex flex-col gap-4 pb-4"
         >
            <div>
               <label className="text-gray-700">Name</label>
               <input
                  type="text"
                  className="form border w-full p-3 text-sm rounded border-1 border-gray-300 text-gray-600"
                  placeholder="Input Type"
                  register={register("name", { required: true })}
               />
            </div>
            <div>
               <label className="text-gray-700">Description</label>
               <textarea
                  type="textarea"
                  rows={6}
                  className="form border w-full p-3 text-sm rounded border-1 border-gray-300 text-gray-600"
                  placeholder="Input Type"
                  {...register("desc", { required: true })}
               />
            </div>
            <div>
               <label className="text-gray-700 mb-4">Feature Image</label>
               {error && (
                  <span className="text-red-500 mx-4 text-sm">
                     {error.photo}
                  </span>
               )}
               <div className="flex pb-4">
                  <div className="">
                     {imgPreview !== null && (
                        <img
                           className="w-72 h-72 object-contain"
                           src={imgPreview}
                           alt="photo profile"
                        />
                     )}
                     <div className="cursor-pointer mt-2">
                        <label htmlFor="file-input">
                           <FiUpload /> Upload Image
                        </label>
                     </div>
                  </div>
                  <div className="hidden">
                     <input
                        id="file-input"
                        type="file"
                        className="hidden -z-50"
                        accept="image/*"
                        onChange={chooseImage}
                     />
                  </div>
               </div>
            </div>
            <div
               className="flex flex-row-reverse"
               onClick={handleSubmit(onSubmit)}
            >
               <RegularButton title="Save" />
            </div>
         </form>
         <ToastContainer />
      </div>
   );
}

export default AddEditService;
