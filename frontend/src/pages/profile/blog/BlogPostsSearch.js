// @mui
import { styled } from '@mui/material/styles';
import { Autocomplete, InputAdornment, Popper, TextField } from '@mui/material';
// components
import Iconify from '../Iconify';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

// ----------------------------------------------------------------------

const StyledPopper = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '280px !important',
});

export default function BlogPostsSearch({ posts, username }) {
  const navigate = useNavigate();
  return (
    <Autocomplete
      onInputChange={(event, value) => {
        fetch(`/api/blog/fetchOne/`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: qs.stringify({
            author_Name: username,
            tit: value,
          }),
        }).then(res => res.json()).then(data => {
          fetch(
            data[0].html.replace('39.106.5.232:3000', '39.106.5.232:3000/api'), {
            method: 'get',
            responseType: 'blob'
          }).then(
            res => {
              let article = data[0];
              console.log(article)
              res.text().then(html_data => {
                article.html = html_data;
                console.log(article.html);
                navigate('/postpage', { state: article })
              })
            }
          )
        })
      }}
      sx={{ width: 280 }}
      autoHighlight
      popupIcon={null}
      PopperComponent={StyledPopper}
      options={posts}
      getOptionLabel={(post) => post.title}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search post..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
