import { AiOutlinePlus } from "react-icons/ai";
import { PendingInvitesTable } from './PendingInvitesTable'
import { useState } from 'react'
import { InviteNewUserFormDialog } from "./InviteNewUserFormDialog";

export function PendingInvites() {
	const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
   const [isOpen, setIsOpen] = useState(false);

	const data = {
		data: [
			{
				id: 1,
				email: 'test1@example.com',
				created_at: new Date(),
				status: 'Waiting Approval',
			},
			{
				id: 2,
				email: 'test2@example.com',
				created_at: new Date(),
				status: 'Waiting Approval',
			}
		]
	}

	function openInviteDialog() {
      setIsOpen(true);
   }

   function closeInviteDialog() {
      setIsOpen(false);
   }

	return (
		<>
			<div>
				<div className="flex items-center justify-between my-[24px]">
					<h1 className="text-[21px] font-[600] m-0">Pending Invite</h1>
					<button 
						className="border-none flex items-center rounded-[4px] text-[12px] font-bold text-white bg-[#2854F6] py-[12px] px-[10px]  hover:brightness-[90%] cursor-pointer"
						onClick={openInviteDialog}
					>
						<AiOutlinePlus className="mr-[6px]" size={17} />
						Invite New User
					</button>
				</div>
				<PendingInvitesTable
					data={data}
	            pageIndex={pageIndex}
	            pageSize={pageSize}
	            setPagination={setPagination}
	            pageCount={data?.last_page}
	            from={data?.from}
	            to={data?.to}
				/>
			</div>
			<InviteNewUserFormDialog
            isOpen={isOpen}
            onClose={closeInviteDialog}
         />
		</>
	)
}