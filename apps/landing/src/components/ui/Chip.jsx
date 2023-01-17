import clsx from 'clsx'

export function Chip({className, children}) {
    return (
        <div 
            className={clsx(
                "bg-[rgba(0,90,166,0.1)] text-blue-custom text-[12px] font-[500] rounded-full px-[16px] py-[8px]",
                className
            )}
        >
            {children}
        </div>
    )
}