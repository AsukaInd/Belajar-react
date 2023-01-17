/* eslint-disable no-undef */
import { useRef, useEffect } from "react";
import * as MapboxDrawGeodesic from "mapbox-gl-draw-geodesic";
import DrawRectangle from "mapbox-gl-draw-rectangle-restrict-area";
import { ExtendDrawBar } from "~/utils/extendDrawBar";
import { convertGeoDataToNumber } from "../../../../utils/convertGeoDataToNumber";

export function Mapbox(props) {
   const {
      setGeoType,
      setGeoData,
      setLatitudeAndLongtitude,
      geoData,
      longtitudeAndLatitude,
   } = props;
   const mapContainer = useRef(null);
   const map = useRef(null);
   const draw = useRef(null);

   function updateGeojson(e) {
      const data = draw.current.getAll();

      if (data?.features.length > 0) {
         data.features[0].properties.zoom = map.current.getZoom();
      }

      setGeoData(data);

      setLatitudeAndLongtitude(e.features[0].geometry.coordinates[0][0]);
   }

   useEffect(() => {
      if (map.current) return;

      mapboxgl.accessToken =
         "pk.eyJ1IjoiY2hpaXNlODgiLCJhIjoiY2w1aHQwcTBsMDFlODNjb2s5eG9mazJ2NCJ9.3wwBI_BQj0UUj3cBpA0wjw";

      map.current = new mapboxgl.Map({
         container: mapContainer.current,
         style: "mapbox://styles/mapbox/streets-v11",
         zoom: 0,
         center: ["11.2", "-39.0"],
      });

      const modes = MapboxDrawGeodesic.enable(MapboxDraw.modes);

      modes.draw_rectangle = DrawRectangle;

      draw.current = new MapboxDraw({
         modes,
         displayControlsDefault: false,
         controls: {
            trash: true,
         },
      });

      map.current.addControl(
         new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl,
         })
      );

      map.current.addControl(new mapboxgl.NavigationControl());

      const drawBar = new ExtendDrawBar({
         draw: draw.current,
         buttons: [
            {
               on: "click",
               action: () => draw.current.changeMode("simple_select"),
               classes: ["fa-solid", "fa-hand"],
               title: "select",
            },
            {
               on: "click",
               action: () => {
                  draw.current.changeMode("draw_circle");
                  setGeoType("circle");
               },
               classes: ["fa-solid", "fa-circle"],
               title: "draw circle",
            },
            {
               on: "click",
               action: () => {
                  draw.current.changeMode("draw_rectangle");
                  setGeoType("reactangle");
               },
               classes: ["fa-solid", "fa-square"],
               title: "draw rectangle",
            },
            {
               on: "click",
               action: () => {
                  draw.current.changeMode("draw_polygon");
                  setGeoType("custom_shape");
               },
               classes: ["fa-solid", "fa-draw-polygon"],
               title: "draw polygon",
            },
         ],
      });

      map.current.addControl(new mapboxgl.FullscreenControl());

      map.current.addControl(drawBar, "top-left");

      map.current.on("draw.create", updateGeojson);

      map.current.on("draw.update", updateGeojson);

      map.current.on("draw.delete", function (e) {
         const data = draw.current.getAll();

         if (data?.features.length > 0) {
            data.features[0].properties.zoom = 0;
         }

         setGeoData(data);
         setLatitudeAndLongtitude([0, 0]);
      });
   }, []);

   useEffect(() => {
      map.current.on("load", () => {
         if (geoData) {
            draw.current.add(convertGeoDataToNumber(geoData));
         }

         if (longtitudeAndLatitude) {
            map.current.setCenter(longtitudeAndLatitude);

            if (geoData && geoData.features.length > 0) {
               map.current.setZoom(geoData.features[0].properties.zoom);
            }
         }
      });
   }, [geoData, longtitudeAndLatitude]);

   return (
      <div className="relative">
         <div ref={mapContainer} className="map-container" />
      </div>
   );
}


