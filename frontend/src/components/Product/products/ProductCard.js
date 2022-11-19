import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Label from '../components/label';
import { ColorPreview } from '../components/color-utils';
import numeral from 'numeral';
import { useNavigate } from 'react-router-dom';
function result(format, key = '.00') {
  const isInteger = format.includes(key);
  return isInteger ? format.replace(key, '') : format;
}
function fCurrency(number) {
  const format = number ? numeral(number).format('$0,0.00') : '';
  return result(format, '.00');
}
const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

export default function ShopProductCard({ product }) {
  const navigate = useNavigate();
  const { name, image, price, color, priceSale } = product;
  const status = product.status === 0 ? 'normal' : product.status === 1 ? 'sale' : 'new';
  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <StyledProductImg alt={name} src={image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap onClick={handleClick}>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={color} />
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {price && fCurrency(price)}
            </Typography>
            &nbsp;
            {fCurrency(priceSale)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
