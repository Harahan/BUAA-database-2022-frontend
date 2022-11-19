import { useState } from 'react';
import { Menu, Button, MenuItem, Typography } from '@mui/material';
import Iconify from '../components/iconify';
const SORT_BY_OPTIONS = [
  { value: null, label: null },
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];

export default function ShopProductSort({ filter, setFilter }) {
  const [open, setOpen] = useState(null);
  const [selectedOption, setOption] = useState(0);
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handleClick = (event, index) => {
    setOption(index);
    setFilter({ ...filter, op: index - 1 })
    handleClose();
  }
  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {SORT_BY_OPTIONS[selectedOption].label}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_BY_OPTIONS.map((option, index) => (
          <MenuItem
            key={option.value}
            onClick={(event) => handleClick(event, index)}
            sx={{ typography: 'body2' }}
            selected={index === selectedOption}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
