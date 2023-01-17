import { lazy } from "react";
import { LazyLoad } from "~/components/LazyLoad";

const Profile = lazy(() => import("./Profile"));
const UserGroup = lazy(() => import("./UserGroup"));
const Permission = lazy(() => import("./Permission"));

export const userProfileSettingRoutes = [
   {
      path: "",
      element: (
         <LazyLoad>
            <Profile />
         </LazyLoad>
      ),
   },
   {
      path: "user-group",
      element: (
         <LazyLoad>
            <UserGroup />
         </LazyLoad>
      ),
   },
   {
      path: "permission",
      element: (
         <LazyLoad>
            <Permission />
         </LazyLoad>
      ),
   },
]