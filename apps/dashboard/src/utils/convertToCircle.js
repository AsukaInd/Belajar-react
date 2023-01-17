import turfCircle from "@turf/circle";
import * as MapboxDrawGeodesic from "mapbox-gl-draw-geodesic";

export function convertToCircle(geojson) {
   const center = MapboxDrawGeodesic.getCircleCenter(geojson.features[0]);
   const radius = MapboxDrawGeodesic.getCircleRadius(geojson.features[0]);

   const circle = turfCircle(center, radius);

   return circle;
}
