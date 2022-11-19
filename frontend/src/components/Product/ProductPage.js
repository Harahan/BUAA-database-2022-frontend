import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { UserContext } from '../UserContext/UserContext';
import { Container, Stack, Typography, Button } from '@mui/material';
import { ProductSort, ProductList, ProductFilterSidebar } from './products';
import Iconify from './components/iconify';
import qs from 'qs';
export default function ProductsPage() {
    const { data } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [openFilter, setOpenFilter] = useState(false);
    const [filter, setFilter] = useState({
        op: null,
        status: null,
        color: null,
        category: null,
        rating: null,
        price: null
    })
    useEffect(() => {
        console.log(filter)
        console.log(qs.stringify({
            sale: filter.status === "sale",
            new: filter.status === "new",
            category: filter.category === "All" ? "" : filter.category,
            color: filter.color,
            priceSale: filter.price === "below" ? 0 : filter.price === "between" ? 1 : 2,
            rank: filter.rating === null ? 0 : filter.rating,
            username: data.info.username,
            op: filter.op === null ? 3 : filter.op,
        }))
        fetch("/api/shop/fetchUserMerchandises/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: qs.stringify({
                sale: filter.status === "Sale",
                new: filter.status === "New",
                category: filter.category === "All" ? "" : filter.category,
                color: filter.color,
                priceSale: filter.price === "below" ? 0 : filter.price === "between" ? 1 : 2,
                rank: filter.rating === null ? 0 : filter.rating,
                username: data.info.username,
                op: filter.op === null ? 3 : filter.op,
            }),
        }).then(res => res.json()).then(res => {
            console.log(res);
            setProducts(res);
        })
    }, [filter]);
    const navigate = useNavigate();
    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = (event, filters) => {
        console.log(filters)
        setFilter({ ...filter, ...filters })
        setOpenFilter(false);
    };
    const handlePost = () => {
        navigate('/postProduct');
    }
    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Products
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handlePost}>
                        New Post
                    </Button>
                </Stack>
                <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
                    <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                        <ProductFilterSidebar
                            openFilter={openFilter}
                            onOpenFilter={handleOpenFilter}
                            onCloseFilter={handleCloseFilter}
                        />
                        <ProductSort filter={filter} setFilter={setFilter} />
                    </Stack>
                </Stack>
                <ProductList products={products} />
            </Container>
        </>
    );
}
