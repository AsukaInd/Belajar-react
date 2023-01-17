import { IconFolderCheckFill } from '~/components/icons/IconFolderCheckFill'
import { classNames } from "primereact/utils";
import { IconPaperFill } from '~/components/icons/IconPaperFill'
import { IconCalendarAddFill } from '~/components/icons/IconCalendarAddFill'
import { IconCreditCardFill } from '~/components/icons/IconCreditCardFill'

export default function YourSubscription() {
	const titleClass = 'text-[#a7a7a7] text-[12px] block mb-[12px] whitespace-nowrap'
	const subtitleClass = 'm-0 text-[16px] whitespace-nowrap'

	return (
		<div className="layout-content">
			<h1 className="text-[21px] font-[600] mb-[16px]">Subscription</h1>
			<div className="flex flex-col gap-[16px]">
				<div 
					className="flex py-[16px] px-[24px] items-center justify-between border-solid border border-[#e9e9e9] rounded-[8px] overflow-x-auto"
				>
					<div className="flex items-center gap-[48px]">
						<div>
							<span className={titleClass}>Current Subscription Plan</span>
							<h4 className={classNames('text-[#2854F6]', subtitleClass)}>Free Plan</h4>
						</div>
						<div>
							<span className={titleClass}>Seat Plan</span>
							<h4 className={subtitleClass}>5</h4>
						</div>
						<div>
							<span className={titleClass}>Active Users</span>
							<h4 className={subtitleClass}>5</h4>
						</div>
						<div>
							<span className={titleClass}>invited Users</span>
							<h4 className={subtitleClass}>0</h4>
						</div>
						<div>
							<span className={titleClass}>Your Last Payment</span>
							<h4 className={subtitleClass}>2022-01-01 11:00</h4>
						</div>
					</div>
					<div className="ml-[48px]">
						<IconPaperFill className="h-[35px] w-[35px] text-[#7a7a7a]" />
					</div>
				</div>
				<div 
					className="p-[24px] border-solid border border-[#e9e9e9] rounded-[12px] shadow-custom-1"
				>
					<h1 className="mb-[24px] text-[16px]">Payment</h1>
					<div className="flex items-center justify-between mb-[16px]">
						<div className="flex items-center">
							<IconPaperFill className="h-[36px] w-[36px] text-[#2854F6]" />
							<span className="text-[16px] ml-[24px]">Subscription Plan</span>
						</div>
						<span className="text-[16px] font-[500] text-right">Free Plan</span>
					</div>
					<div className="flex items-center justify-between mb-[16px]">
						<div className="flex items-center">
							<IconCalendarAddFill className="h-[36px] w-[36px] text-[#2854F6]" />
							<span className="text-[16px] ml-[24px]">Subscription Plan</span>
						</div>
						<span className="text-[16px] font-[500] text-right">Paying Monthly</span>
					</div>
					<div className="bg-[#F4F4F4] rounded-[8px] px-[24px] py-[16px]">
						<h1 className="text-[14px] mb-[12px]">Next Payment information</h1>
						<p className="text-[12px] font-[500]">Your Free Trial is valid until 16 july 2022. On that date, your account will be billed $128.00 (exclude tax and discount). Feel free to cancel your Free Trial before 16 july 2022 and your will not charged</p>
					</div>
				</div>
				<div
					className="p-[28px] border-solid border border-[#e9e9e9] rounded-[12px] shadow-custom-1"
				>
					<h1 className="mb-[24px] text-[16px]">Payment Method</h1>
					<div className="flex items-center gap-[21px]">
						<IconCreditCardFill/>
						<div className="flex flex-col">
							<span className="text-[16px] font-[600] mb-[6px]">Card *******2018</span>
							<span className="text-[16px] font-[500]">Expired 06/25</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}