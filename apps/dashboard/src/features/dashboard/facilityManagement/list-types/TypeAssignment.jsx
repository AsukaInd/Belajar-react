import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { useUpdateListType } from "~/features/dashboard/facilityManagement/hooks/list/useUpdateListType";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";

export function TypeAssignment({ selectedList, name }) {
   const list_id = selectedList?.id;
   const { t } = useTranslation();
   const toast = useRef(null);
   const [columns, setColumns] = useState(
      createDefaultValue({
         itemsInTheList: selectedList?.type_in_list,
         itemsNotInTheList: selectedList?.type_not_in_list,
      })
   );

   const isDisabled =
      columns.inTheList.items.length === 0 &&
      columns.notInTheList.items.length === 0;

   const assign = useUpdateListType({
      name,
      list_id,
      inTheList: columns.inTheList.items,
      notInTheList: columns.notInTheList.items,
      handleSuccess() {
         toast.current.show({
            severity: "success",
            summary: "Success",
            detail: t("dashboard.type-list.success-update"),
            life: 3000,
         });
      },
   });

   function createDefaultValue({ itemsInTheList, itemsNotInTheList }) {
      return {
         inTheList: {
            name: t("dashboard.type-list.in-the-list"),
            items: itemsInTheList ?? [],
         },
         notInTheList: {
            name: t("dashboard.type-list.not-in-the-list"),
            items: itemsNotInTheList ?? [],
         },
      };
   }

   async function handleUpdate() {
      assign.mutate();
   }

   function onDragEnd(result, columns, setColumns) {
      if (!result.destination) return;
      const { source, destination } = result;

      if (source.droppableId !== destination.droppableId) {
         const sourceColumn = columns[source.droppableId];
         const destColumn = columns[destination.droppableId];
         const sourceItems = [...sourceColumn.items];
         const destItems = [...destColumn.items];
         const [removed] = sourceItems.splice(source.index, 1);
         destItems.splice(destination.index, 0, removed);
         setColumns({
            ...columns,
            [source.droppableId]: {
               ...sourceColumn,
               items: sourceItems,
            },
            [destination.droppableId]: {
               ...destColumn,
               items: destItems,
            },
         });
      } else {
         const column = columns[source.droppableId];
         const copiedItems = [...column.items];
         const [removed] = copiedItems.splice(source.index, 1);
         copiedItems.splice(destination.index, 0, removed);
         setColumns({
            ...columns,
            [source.droppableId]: {
               ...column,
               items: copiedItems,
            },
         });
      }
   }

   useEffect(() => {
      setColumns(
         createDefaultValue({
            itemsInTheList: selectedList?.type_in_list,
            itemsNotInTheList: selectedList?.type_not_in_list,
         })
      );
   }, [selectedList]);

   return (
      <>
         <div
            style={{
               display: "flex",
               justifyContent: "center",
               height: "100%",
            }}
         >
            <DragDropContext
               onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
               {Object.entries(columns).map(([columnId, column], index) => {
                  return (
                     <div
                        className="flex flex-column align-items-center"
                        key={columnId}
                     >
                        <h3>{column.name}</h3>
                        <div className="m-2">
                           <Droppable droppableId={columnId} key={columnId}>
                              {(provided, snapshot) => {
                                 return (
                                    <div
                                       {...provided.droppableProps}
                                       ref={provided.innerRef}
                                       style={{
                                          background: snapshot.isDraggingOver
                                             ? "lightblue"
                                             : undefined,
                                          border: "1px solid black",
                                          padding: 8,
                                          width: 200,
                                          height: 340,
                                          overflow: "auto",
                                       }}
                                    >
                                       {column.items.map((item, index) => {
                                          return (
                                             <Draggable
                                                key={item.id}
                                                draggableId={String(item.id)}
                                                index={index}
                                             >
                                                {(provided, snapshot) => {
                                                   return (
                                                      <div
                                                         ref={provided.innerRef}
                                                         {...provided.draggableProps}
                                                         {...provided.dragHandleProps}
                                                         style={{
                                                            userSelect: "none",
                                                            padding: 16,
                                                            margin: "0 0 8px 0",
                                                            backgroundColor:
                                                               snapshot.isDragging
                                                                  ? "#263B4A"
                                                                  : "#0D47A1",
                                                            color: "white",
                                                            ...provided
                                                               .draggableProps
                                                               .style,
                                                         }}
                                                      >
                                                         {item.name}
                                                      </div>
                                                   );
                                                }}
                                             </Draggable>
                                          );
                                       })}
                                       {provided.placeholder}
                                    </div>
                                 );
                              }}
                           </Droppable>
                        </div>
                     </div>
                  );
               })}
            </DragDropContext>
         </div>
         <Button
            className="ml-3"
            label={t("dashboard.type-list.save-changes")}
            onClick={handleUpdate}
            loading={assign.isLoading}
            disabled={isDisabled}
         />
         <Toast ref={toast} position="top-right" />
      </>
   );
}
