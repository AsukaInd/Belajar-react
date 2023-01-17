import { RegularButton } from "./Button";
import { Dialog } from "primereact/dialog";
import { useTranslation } from "react-i18next";
import { IconDelete } from "~/components/icons/IconDelete";
import { Toast } from "primereact/toast";
import { useRef } from "react";

export function AddEditModal({
    isOpen,
    onClose,
    handleSubmit,
    onSubmit,
    isEdit,
    children,
    title,
}) {
    const { t } = useTranslation();
    const toast = useRef(null);

    return (
        <>
            <Dialog
                modal
                showHeader={false}
                closable={false}
                visible={isOpen}
                className="p-dialog-delete"
                style={{ width: '100%', maxWidth: '600px' }}
                onHide={onClose}
                transitionOptions={{
                    timeout: 500,
                }}
            >
                <div className="">
                    <h6 className="text-xl mt-2 font-semibold pb-2 border-gray-400">
                        {title}
                    </h6>
                    <hr className="mt-2"/>
                </div>
                <div className="py-3">
                    {children}
                </div>
                <div className="flex gap-1 !text-base !text-center">
                    <RegularButton
                        className="!text-gray-500 !px-2 !bg-white-1 hover:!bg-gray-500 items-center justify-center hover:!text-white-1 flex-auto !text-center"
                        title="Cancel"
                        onClick={onClose}
                    />
                    <RegularButton
                        className="!text-[#2854F6] flex-auto !px-2 hover:!bg-[#2854F6] hover:!text-white-1 items-center justify-center !bg-white-1 border !border-[#2854F6] flex-2"
                        title="Save and add another"
                        onClick={() => console.log('save and add another')}
                    />
                    <RegularButton
                        className="!text-[#2854F6] flex-auto !px-2 hover:!bg-[#2854F6] hover:!text-white-1 items-center justify-center !bg-white-1 border !border-[#2854F6] flex-2"
                        title="Save and Continue Editing"
                        onClick={() => console.log('save and add another')}
                    />
                    <RegularButton
                        title={isEdit ? "Save" : "Create"}
                        onClick={handleSubmit(onSubmit)}
                        className="flex-1 !bg-[#2854F6] items-center justify-center"
                    />
                </div>
            </Dialog>
            <Toast ref={toast} position="top-right" />
        </>
    );
}
