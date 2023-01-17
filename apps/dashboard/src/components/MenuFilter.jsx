import { useState, forwardRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { classNames } from "primereact/utils";
import { Checkbox } from "primereact/checkbox";
import { ProgressSpinner } from "primereact/progressspinner";

export const MenuFilter = forwardRef(
   ({ className,
      onApplyFilter,
      listData,
      disableSearch,
      searchRef,
      onSearchKeyUp,
      onSearchChange,
      isSearchLoading,
      ...props
   }, ref) => {
      const [selected, setSelected] = useState(null);

      function getValue(value, key) {
         if (typeof value === 'string') {
            return value
         }

         return key ? value[key] : value?.label
      }

      function isSelected(name) {
         return selected === name
      }

      return (
         <OverlayPanel
            ref={ref}
            className={classNames("menu-filter", className)}
            {...props}
         >
            <div className="flex flex-column">
               {
                  !disableSearch
                     ? (
                        <span className="p-input-icon-left search">
                           <i className="pi pi-search" />
                           <InputText
                              ref={searchRef}
                              placeholder="Search"
                              onKeyUp={onSearchKeyUp}
                              onChange={onSearchChange}
                           />
                        </span>
                     )
                     : null
               }
               <ul className="list-none py-2">
                  {
                     isSearchLoading
                        ? (
                           <div className="flex justify-center my-2">
                              <ProgressSpinner strokeWidth={3} />
                           </div>
                        )
                        : listData?.length > 0 ? (
                           listData?.map((item, index) => {
                              return (
                                 <li
                                    key={index}
                                    className={classNames(
                                       "flex align-items-center py-1",
                                       {
                                          "mb-3": index !== listData.length - 1,
                                       }
                                    )}
                                 >
                                    <Checkbox
                                       className="mr-4"
                                       inputId={getValue(item)}
                                       onChange={() => {
                                          if (isSelected(getValue(item, 'value'))) {
                                             setSelected(null)
                                          } else {
                                             setSelected(getValue(item, 'value'))
                                          }
                                       }}
                                       checked={isSelected(getValue(item, 'value'))}
                                    />
                                    <label htmlFor={getValue(item)} style={{ width: '130px' }}>
                                       {getValue(item)}
                                    </label>
                                 </li>
                              );
                           })
                        ) : (
                           <p className="text-center">no data found</p>
                        )
                  }
               </ul>
               {listData?.length > 0 && (
                  <Button
                     className="p-button-outlined"
                     onClick={() => {
                        if (onApplyFilter) {
                           onApplyFilter(selected);
                        }
                     }}
                     label="Apply Filter"
                  />
               )}
            </div>
         </OverlayPanel>
      );
   }
);
