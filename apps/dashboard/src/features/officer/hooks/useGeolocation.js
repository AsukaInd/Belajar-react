import { useEffect, useState } from "react";

const COORDS_KEY = "coords";

export function useGeolocation() {
   const [coords, setCoords] = useState(
      window.sessionStorage.getItem(COORDS_KEY)
   );
   const [errorMessage, setErrorMessage] = useState(null);
   const [isError, setIsError] = useState(null);
   const [isLoading, setIsLoading] = useState(null);

   function success(position) {
      const pos = [position.coords.longitude, position.coords.latitude];
      setCoords(pos);
      window.sessionStorage.setItem(COORDS_KEY, JSON.stringify(pos));
      setIsLoading(false);
   }

   function error(error) {
      setErrorMessage(error.message);
      setIsLoading(false);
      setIsError(true);
   }

   useEffect(() => {
      setIsLoading(true);

      if ("geolocation" in navigator) {
         if (!coords) {
            navigator.geolocation.getCurrentPosition(success, error);
         } else {
            setIsLoading(false);
         }
      } else {
         setIsError(true);
         setErrorMessage("Geolocation is not supported by your browser");
         setCoords(null);
         setIsLoading(false);
      }
   }, []);

   return {
      coords: Array.isArray(coords) ? coords : JSON.parse(coords),
      errorMessage,
      isLoading,
      isError,
   };
}
