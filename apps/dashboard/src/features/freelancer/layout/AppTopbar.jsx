export function AppTopbar(props) {
  return (
     <div className="bg-white shadow-4 h-5rem px-5 flex align-items-center justify-content-between">
        <div>{props.left}</div>
        <div>{props.right}</div>
     </div>
  );
}