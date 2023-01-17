import { PaymentHistoryTable } from '~/features/dashboard/subscriptionSetting/paymentHistory/PaymentHistoryTable'
import { useState } from 'react'

export default function PaymentHistory() {

   const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

	const data = {
		data: [
			{
				id: 1,
				item: 'Advance Annual Plan',
				created_at: new Date(),
				payment_method: "Paypal",
				order_total: '1,200.00'
			}
		]
	}

	return (
		<div className="layout-content">
			<div className="flex items-center justify-between mb-[30px]">
				<h1 className="text-[21px] font-[600] m-0">Payment History</h1>
				<button 
					className="border-none rounded-[4px] text-[12px] font-bold text-white bg-[#2854F6] py-[12px] px-[10px]"
				>
					Purchase Now
				</button>
			</div>
			<div className="px-[24px] py-[16px] text-[#2854F6] bg-[#F4F6FE] rounded-[8px] mb-[16px]">
				<p>
					Every payment for Invited User and request Product Inspection will be appeared here
				</p>
			</div>
			<div>
				<PaymentHistoryTable
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