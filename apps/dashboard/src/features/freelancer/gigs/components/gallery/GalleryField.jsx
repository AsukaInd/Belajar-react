import React from "react";
import { ErrorMessage } from "~/components/ErrorMessage";
import { Dropzone } from "~/components/Dropzone";
import { useForm } from "react-hook-form";

function GalleryField({ register, setValue, watch }) {

  // const {
  //   // handleSubmit,
  //   formState: { errors, isValid },
  //   // reset,
  //   // setValue,
  //   register,
  //   // watch,
  //   // getValues,
  // } = useForm({
  //   mode: "onChange",
  //   // resolver: yupResolver(gigsSchema),
  //   defaultValues: {
  //     title: "",
  //     seo_title: "",
  //     description: "",
  //     category_id: 1,
  //     sub_category_id: 1,
  //     gig_photos: [
  //       {
  //         image: null,
  //       }
  //     ],
  //     package_gig: [
  //       {
  //         level_package: "",
  //         name_package: "",
  //         description: "",
  //         price_package: "",
  //         revision_package_id: "1",
  //         delivery_time_package_id: "1",
  //         delivery_time: "1",
  //         revision_limit: "1",
  //       },
  //     ],
  //     legal_doc: "1",
  //     // faqs_gigs: [
  //     //    {
  //     //       project_detail_name: "",
  //     //       description_faq: "",
  //     //    }
  //     // ]
  //   },
  // });

  return (
    <section className="drop-shadow bg-white rounded-lg mt-8 border border-gray-500">
      <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
        <div className="flex flex-col md:flex-col gap-4">
          <h1 className="font-bold text-2xl my-auto">Build your GIG Gallery</h1>
          <h2 className="font-light text-xl my-auto">Add memorable content to your gallery to set yourself apart from competitors.</h2>
        </div>
      </div>
      <div className="flex flex-col gap-4 text-gray-600 text-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="bg-white shadow dark:bg-gray-800 flex justify">
            <div className="bg-blue-500 p-3 mt-2 rounded text-blue-800 text-lg">
              Noted: To comply with inspxt terms of service, make sure to upload only content you either own or you have the permission or license to use.
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-col gap-4">
          <h1 className="font-bold text-2xl my-auto">Gig Photos</h1>
          <h2 className="font-light text-xl my-auto">Upload photos that describe or are related to your Gig.</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Dropzone
              register={register}
              file={watch('gig_photos[0].image')}
              setValue={setValue}
              valueKey="gig_photos[0].image"
            />
            <div className="my-4">
              <ErrorMessage
              //  error={error}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <Dropzone
              register={register}
              file={watch('gig_photos[1].image')}
              setValue={setValue}
              valueKey="gig_photos[1].image"
            />
            <div className="my-4">
              <ErrorMessage
              //  error={error}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <Dropzone
              register={register}
              file={watch('gig_photos[2].image')}
              setValue={setValue}
              valueKey="gig_photos[2].image"
            />
            <div className="my-4">
              <ErrorMessage
              //  error={error}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GalleryField;