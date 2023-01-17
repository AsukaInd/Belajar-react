import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Checkboxes() {
  return (
    <div className="mt-5 mx-3">
      <Checkbox {...label} />
    </div>
  );
}