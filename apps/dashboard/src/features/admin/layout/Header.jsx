import { classNames } from "primereact/utils";
import { FaCaretDown } from "react-icons/fa";

export function Header({mobileMenuActive, setMobileMenuActive}) {
	return (
		<header 
			className={classNames(
				"bg-white z-[998] left-0 right-0 h-[72px] sticky top-0 shadow-custom flex items-center",
				"border-solid border-b border-x-0 border-t-0 border-[#F4F4F4] px-[28px] justify-between",
			)}
		>
			<div className="block lg:hidden">
				<MenuIcon 
					isActive={mobileMenuActive}
					onClick={(e) => {
						e.stopPropagation()
						setMobileMenuActive(prev => !prev)
					}}
				/>
			</div>
			<img className="h-[35px] hidden sm:block" src="/inspxt-logo.png" />
			<div>
				<div 
					className={classNames(
						"flex justify-between items-center bg-[#FAFBFF]",
						"border-solid border rounded-full px-[12px] py-[8px] border-[#F4F6FF]"
					)}
				>
					<img className="h-[30px] w-[30px] rounded-full" src="/dummy-profile.png"/>
					<span className="mx-[12px] font-bold">John Mandes</span>
					<button className="text-[#a7a7a7] bg-transparent border-none flex items-center">
						<FaCaretDown />
					</button>
				</div>
			</div>
		</header>
	)
}

function MenuIcon({onClick, isActive}) {
	const line = 'absolute select-none rounded-md h-[3px] w-[35px] bg-zinc-900'

	return (
		<button 
			className="select-none relative bg-transparent border-none h-[30px] w-[40px] cursor-pointer" 
			onClick={onClick}
		>
			<div 
				className={classNames(
					line,
					"transition",
					[isActive ? 'transform rotate-[45deg] top-1/2 transform -translate-y-1/2' : 'top-[3px]']
				)}
			></div>
			<div 
				className={classNames(
					line,
					'top-1/2 transform -translate-y-1/2 transition', 
					{'transform -translate-x-[30px] opacity-0': isActive}
				)}
			></div>
			<div 
				className={classNames(
					line,
					"transition",
					[isActive ? 'transform -rotate-[45deg] top-1/2 transform -translate-y-1/2' : 'bottom-[3px]']
				)}
			></div>
		</button>
	)
}