import { useController } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";

export function DropdownCustom({
   label,
   isRequired = false,
   placeholder,
   options,
   name,
   control,
}) {
   const { field} = useController({ name, control });

   const selectedContainerTemplate = (option, props) => {
      if (option) {
         return (
            <div className="flex gap-4 w-full">
               <div className="w-[32px]">
                  <img
                     alt={option.label}
                     src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
                     onError={(e) =>
                        (e.target.src =
                           "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                     }
                     className="object-cover w-full rounded-full"
                  />
               </div>
               <div className="my-auto">{option.label}</div>
            </div>
         );
      }

      return <span>{props.placeholder}</span>;
   };

   const childOptionTemplate = (option) => {
      return (
         <div className="flex gap-4 w-full">
            <div className="w-[32px]">
               <img
                  alt={option.label}
                  src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
                  onError={(e) =>
                     (e.target.src =
                        "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                  }
                  className="object-cover w-full rounded-full"
               />
            </div>
            <div className="my-auto">{option.label}</div>
         </div>
      );
   };
   return (
      <div className="w-full flex flex-col">
         <label className="font-bold text-black-1">
            {label}
            {isRequired && <span className="required-field">*</span>}
         </label>
         <Dropdown
               // value={selected}
               options={options}
               // onChange={(e) => {
               //    setSelected(e.value);
               // }}
               optionLabel="name"
               filter
               showClear
               className="w-full mb-4"
               filterBy="name"
               placeholder={placeholder}
               valueTemplate={selectedContainerTemplate}
               itemTemplate={childOptionTemplate}
               {...field}
            />
      </div>
   );
}
