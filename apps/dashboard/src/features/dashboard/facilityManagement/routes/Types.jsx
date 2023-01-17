import { ListTypes } from "~/features/dashboard/facilityManagement/list-types/ListTypes";
import { useTypes } from "~/features/dashboard/facilityManagement/hooks/type/useTypes";
import { useLists } from "~/features/dashboard/facilityManagement/hooks/list/useLists";
import { useTranslation } from "react-i18next";

export default function Types({ name }) {
   const { t } = useTranslation();
   const typeList = useLists({ name });
   const allTypes = useTypes({ name });

   return (
      <div className="layout-content">
         <h2 className="mb-4">{t(`dashboard.type-list.${name}-type`)}</h2>
         <ListTypes
            name={name}
            allTypesData={allTypes}
            typeListData={typeList}
         />
      </div>
   );
}
