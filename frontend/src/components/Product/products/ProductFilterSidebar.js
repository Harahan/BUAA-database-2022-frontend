import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { useState } from 'react';
import Iconify from '../components/iconify';
import { ColorMultiPicker } from '../components/color-utils';
export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];
export const FILTER_STATUS_OPTIONS = ['All', 'Sale', 'New'];
export const FILTER_CATEGORY_OPTIONS = ['All', 'Food', 'Clothing', 'Book', 'Decoration', 'Digital', 'Other'];
export const FILTER_PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];
export const FILTER_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];
export default function ShopFilterSidebar({ openFilter, onOpenFilter, onCloseFilter }) {
  const [filters, setFilters] = useState({
    status: null,
    color: null,
    category: null,
    rating: null,
    price: null
  })
  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={() => {
        setFilters({
          status: null,
          color: null,
          category: null,
          rating: null,
          price: null
        })
        onOpenFilter()
      }}>
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={(event) => onCloseFilter(event, filters)}
        PaperProps={{
          sx: { width: 280, border: 'none' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={(event) => onCloseFilter(event, filters)}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />
        <Stack spacing={3} sx={{ p: 3 }}>
          <div>
            <Typography variant="subtitle1" gutterBottom>
              Status
            </Typography>
            <RadioGroup onChange={(event) => setFilters({ ...filters, status: event.target.value })}>
              {FILTER_STATUS_OPTIONS.map((item) => (
                <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
              ))}
            </RadioGroup>
          </div>

          <div>
            <Typography variant="subtitle1" gutterBottom>
              Category
            </Typography>
            <RadioGroup onChange={(event) => setFilters({ ...filters, category: event.target.value })}>
              {FILTER_CATEGORY_OPTIONS.map((item) => (
                <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
              ))}
            </RadioGroup>
          </div>

          <div>
            <Typography variant="subtitle1" gutterBottom>
              Colors
            </Typography>
            <ColorMultiPicker
              name="colors"
              selected={[filters.color]}
              colors={FILTER_COLOR_OPTIONS}
              onChangeColor={(color) => {
                if (color === filters.color) {
                  setFilters({ ...filters, color: null });
                } else {
                  setFilters({ ...filters, color });
                }
              }}
              sx={{ maxWidth: 38 * 4 }}
            />
          </div>

          <div>
            <Typography variant="subtitle1" gutterBottom>
              Price
            </Typography>
            <RadioGroup onChange={(event) => setFilters({ ...filters, price: event.target.value })}>
              {FILTER_PRICE_OPTIONS.map((item) => (
                <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
              ))}
            </RadioGroup>
          </div>
          <div>
            <Typography variant="subtitle1" gutterBottom>
              Rating
            </Typography>
            <div>
              <Rating name="rate" defaultValue={1} size="large" onChange={(event) => setFilters({ ...filters, rating: event.target.value })} />
              &nbsp;&nbsp;&nbsp;&nbsp;&up
            </div>
          </div>
        </Stack>
      </Drawer>
    </>
  );
}
