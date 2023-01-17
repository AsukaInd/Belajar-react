import { AiOutlinePlus } from "react-icons/ai";
import { UsersAndGroupTable } from './UsersAndGroupTable'
import { useState } from 'react'
import { InviteNewUserFormDialog } from "./InviteNewUserFormDialog";

export function UsersAndGroup() {

	const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
   const [isOpen, setIsOpen] = useState(false);

	const data = {
		data: [
			{
				id: 1,
				email: 'test1@example.com',
				name: 'John Kennedy John',
				company_name: "INPXT Company",
				group: 'Group A',
				status: 'Active',
				permission: 'Admin'
			},
			{
				id: 2,
				email: 'test2@example.com',
				name: 'John Kennedy John',
				company_name: "INPXT Company",
				group: '',
				status: 'Deactive',
				permission: 'Admin'
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
					<h1 className="text-[21px] font-[600] m-0">User Group</h1>
					<button 
						className="border-none flex items-center rounded-[4px] text-[12px] font-bold text-white bg-[#2854F6] py-[12px] px-[10px] hover:brightness-[90%] cursor-pointer"
						onClick={openInviteDialog}
					>
						<AiOutlinePlus className="mr-[6px]" size={17} />
						Invite New User
					</button>
				</div>
				<div className="px-[24px] py-[16px] text-[#2854F6] bg-[#F4F6FE] rounded-[8px] mb-[8px]">
					<p>
						Explore Inspxt with your team and your supply chain to discover how you can collaborate together to save time, collaborate on inpection schedule, share reports information and get work done quickly 
					</p>
				</div>
				<div className="px-[24px] py-[16px] text-[#61B15A] bg-[#F5FBF4] rounded-[8px] mb-[24px]">
					<p>
						Adding 1 user will cost <b>$29.00/month</b> after your trial ends
					</p>
				</div>
				<UsersAndGroupTable
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