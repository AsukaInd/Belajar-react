import { Mapbox } from "../Mapbox";
import { InputText } from "primereact/inputtext";
import { Controller } from "react-hook-form";

export function SiteFormLocation(props) {
   const {
      setGeoData,
      setGeoType,
      setLatitudeAndLongtitude,
      geoData,
      longtitudeAndLatitude,
      control,
   } = props;

   return (
      <div>
         <div className="flex">
            <div className="mr-4 w-full">
               <div className="field">
                  <label htmlFor="site-address">Site Address</label>
                  <Controller
                     name="site_address"
                     control={control}
                     render={({ field }) => (
                        <InputText id="site-address" {...field} />
                     )}
                  />
               </div>
               <div className="field">
                  <label htmlFor="room">Room</label>
                  <Controller
                     name="room"
                     control={control}
                     render={({ field }) => <InputText id="room" {...field} />}
                  />
               </div>
            </div>
            <div className="w-full">
               <div className="field">
                  <label htmlFor="building">Building</label>
                  <Controller
                     name="building"
                     control={control}
                     render={({ field }) => (
                        <InputText id="building" {...field} />
                     )}
                  />
               </div>
               <div className="field">
                  <label htmlFor="floor">Floor</label>
                  <Controller
                     name="floor"
                     control={control}
                     render={({ field }) => <InputText id="floor" {...field} />}
                  />
               </div>
            </div>
         </div>
         <Mapbox
            setLatitudeAndLongtitude={setLatitudeAndLongtitude}
            setGeoType={setGeoType}
            setGeoData={setGeoData}
            geoData={geoData}
            longtitudeAndLatitude={longtitudeAndLatitude}
         />
      </div>
   );
}
