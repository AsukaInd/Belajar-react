import { AiOutlinePlus } from "react-icons/ai";
import { RegularButton } from '~/components/product-inspection/Button'
import { PermissionTable } from '~/features/dashboard/userProfileSetting/permission/PermissionTable'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Permission() {

	const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

	const data = {
		data: [
			{
				id: 1,
				name: 'John Kennedy John',
				company_name: "INPXT Company",
				group: 'Group A',
				status: 'Active',
				permission: 'Admin'
			}
		]
	}

	return (
		<div className="layout-content">
			<div className="flex items-center justify-between mb-[30px]">
				<h1 className="text-[21px] font-[600] m-0">Permission</h1>
				<Link
					className="border-none flex items-center rounded-[4px] text-[12px] font-bold text-white bg-[#2854F6] py-[12px] px-[10px] hover:brightness-[90%] cursor-pointer"
					to="/user-profile-setting/user-group"
				>
					<AiOutlinePlus className="mr-[6px]" size={17} />
					Invite New User
				</Link>
			</div>
			<div className="px-[24px] py-[16px] text-[#2854F6] bg-[#F4F6FE] rounded-[8px] mb-[16px]">
				<p>
					You can set or setting the user's permission only for <b>Active Users</b>
				</p>
			</div>
			<div>
				<PermissionTable
               data={data}
               pageIndex={pageIndex}
               pageSize={pageSize}
               setPagination={setPagination}
               pageCount={data?.last_page}
               from={data?.from}
               to={data?.to}
            />
			</div>
		</div>
	)
}