import { classNames } from "primereact/utils";

export function ErrorMessage({ error, className }) {
   return (
      <span className={classNames("text-center mt-2 block text-red-500", className)}>
         {error && error.status < 500
            ? error.data.message
            : error?.statusText ?? error?.message}
      </span>
   );
}
