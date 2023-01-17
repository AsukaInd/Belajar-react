export function BulkActionOptionTemplate(option) {
   return (
      <div className="bulk-action-item flex align-items-center justify-content-between">
         <div>{option.label}</div>
         {option.icon}
      </div>
   );
}
