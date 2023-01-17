import { createContext, useState, useMemo } from "react";
import {
   tokenStorage,
   ADMIN_KEY,
   SUBSCRIBER_KEY,
   OFFICER_KEY,
   FREELANCER_KEY,
   FREELANCER_ADMIN_KEY
} from "~/utils/tokenStorage";

export const AuthContext = createContext();

export function AuthProvider(props) {
   const [tokens, setTokens] = useState(tokenStorage.getTokens());

   function setAuth(key, token) {
      tokenStorage.setToken(key, token);
      setTokens(tokenStorage.getTokens());
   }

   function logout() {
      tokenStorage.deleteAllTokens();
      setTokens(tokenStorage.getTokens());
   }

   const value = useMemo(
      () => ({
         adminToken: tokens ? tokens[ADMIN_KEY] : null,
         subscriberToken: tokens ? tokens[SUBSCRIBER_KEY] : null,
         officerToken: tokens ? tokens[OFFICER_KEY] : null,
         freelancerToken: tokens ? tokens[FREELANCER_KEY] : null,
         freelancerAdminToken: tokens ? tokens[FREELANCER_ADMIN_KEY] : null,
         setAuth,
         logout,
      }),
      [tokens]
   );

   return <AuthContext.Provider value={value} {...props} />;
}
