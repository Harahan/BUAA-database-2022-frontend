// @mui
import { MenuItem, TextField } from '@mui/material';

export default function BlogPostsSort({ options, onSort, value }) {
  return (
    <TextField select size="small" value={value} onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
