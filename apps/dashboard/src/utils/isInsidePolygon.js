import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import * as MapboxDrawGeodesic from "mapbox-gl-draw-geodesic";
import { convertGeoDataToNumber } from "./convertGeoDataToNumber";
import { convertToCircle } from "./convertToCircle";

export function isInsidePolygon(geoData, coords) {
   if ("features" in geoData === false || geoData.features.length === 0)
      return false;

   let status = null;

   const converted = convertGeoDataToNumber(geoData)

   for (const feature of converted.features) {
      if (!status) {
         if (MapboxDrawGeodesic.isCircle(feature)) {
            status = booleanPointInPolygon(
               coords,
               convertToCircle({ features: [feature] })
            );
         } else {
            status = booleanPointInPolygon(coords, feature.geometry);
         }
      }
   }

   return status;
}
