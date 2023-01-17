import { useTranslation } from "react-i18next";

export function transformDropdownType(keyData, translateKey) {
   const { t } = useTranslation();

   return keyData.map((item) => {
      const translatedValue = t(`${translateKey}.${item}`);
      return {
         label: translatedValue,
         value: translatedValue,
      };
   });
}
