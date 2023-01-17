export function RegularButton({ title, icon = null, onClick, className }) {
   return (
      <div className={`${className} flex gap-2 bg-blue-500 hover:bg-blue-700 h-[45px] items-center justify-center text-white rounded px-4 py-3 font-bold cursor-pointer `} onClick={onClick}>
         {icon && <img src={icon} alt={icon} className="my-auto" />}
         {title}
      </div>
   );
}

export function LinkButton({ title, icon = null, onClick, className }) {
   return (
      <div className={`flex gap-2 bg-blue-600 hover:bg-blue-700 text-white h-[45px] items-center justify-center rounded px-4 py-3 font-bold cursor-pointer ${className}`} onClick={onClick}>
         {icon && <img src={icon} alt={icon} className="my-auto" />}
         {title}
      </div>
   );
}

export function Button({ label, icon = null, onClick, className, ...props }) {
   return (
      <button className={`${className} flex gap-2 border-0  text-white rounded h-[45px] items-center justify-center px-4 py-3 font-bold cursor-pointer `} onClick={onClick} {...props}>
         {icon}
         {label}
      </button>
   );
}