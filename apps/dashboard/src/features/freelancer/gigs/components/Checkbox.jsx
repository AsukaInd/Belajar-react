import Checkbox from '@mui/material/Checkbox';
import { useController } from "react-hook-form"

export default function Checkboxes({ name, control }) {
  const { field } = useController({ name, control })

  return (
    <div className="mt-5 mx-3">
      <Checkbox
        checked={Boolean(field.value)}
        onChange={(e) => {
          field.onChange(Number(e.target.checked))
        }}
      />
    </div>
  );
}