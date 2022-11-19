import { Box, Container, Grid, Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import { InputNumber } from 'antd'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ColorMultiPicker } from './components/color-utils';
import qs from 'qs';
function Product() {
    const params = useParams()
    const [value, setValue] = useState(1);
    const [color, setColor] = useState();
    const [info, setInfo] = useState({})
    useEffect(() => {
        fetch("/api/shop/getMerchandise/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: qs.stringify({
                id: params.id
            }),
        }).then(res => res.json()).then(res => {
            console.log(res.color)
            setInfo(res)
        })
    }, [params])
    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Grid
                        container
                        spacing={10}
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                    >
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xs={12}
                        >
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <img src={info.image} width='500px' height={'400px'} />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Card minWidth={275}>
                                    <CardContent>
                                        <Typography fontSize={24}
                                            variant="button" color="textPrimary" gutterBottom
                                            sx={{ fontWeight: 'bold' }}
                                        >
                                            {info.name}
                                        </Typography>
                                        <Typography fontSize={18}
                                            variant="caption" color="#DC143C" display="block" gutterBottom
                                        >
                                            {info.description}
                                        </Typography>
                                    </CardContent>
                                    <CardContent>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            sx={{ bgcolor: '#DCDCDC' }}
                                            marginBottom={3}
                                        >
                                            <Grid
                                                item display={'inline'} marginRight={3}
                                            >
                                                <Typography color="#808080" fontSize={20}>
                                                    价格
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                            >
                                                <Typography color="#FF0000" display={'inline'} fontSize={20} marginRight={1}>
                                                    $
                                                </Typography>
                                                <Typography color="#FF0000" display={'inline'} fontSize={24} sx={{ fontWeight: 'bold' }}>
                                                    {info.price}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                        >
                                            <Grid
                                                item display={'inline'} marginRight={3}
                                            >
                                                <Typography color="#808080" fontSize={20}>
                                                    运费
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                            >
                                                <Typography display={'block'} fontSize={20}>
                                                    {info.deliveryLocation}
                                                </Typography>
                                                <Typography display={'block'} fontSize={20}>
                                                    {info.deliveryTime}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardContent>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                        >
                                            <Grid
                                                item display={'inline'} marginRight={3}
                                            >
                                                <Typography color="#808080" fontSize={20}>
                                                    颜色
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                            >
                                                <ColorMultiPicker
                                                    name="colors"
                                                    selected={[color]}
                                                    colors={info.color===undefined?[]:info.color}
                                                    onChangeColor={(item) => {
                                                        if (color === item) {
                                                            setColor(null);
                                                        }
                                                        else {
                                                            setColor(item);
                                                        }
                                                    }}
                                                    sx={{ maxWidth: 500 }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardContent>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center" gap={2}>
                                            <Grid item>
                                                <Typography display={'block'} fontSize={20} color="grey" sx={{ fontWeight: 'bold' }}>
                                                    数量
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <InputNumber min={1} max={99} value={value} onChange={setValue} />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardActions>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="space-around"
                                            alignItems="center" gap={10}>
                                            <Button sx={{ bgcolor: "#FF9933" }}>
                                                <Typography display={'block'} fontSize={20} color="white" sx={{ fontWeight: 'bold' }}
                                                    marginTop={1.3} marginBottom={1.3} marginLeft={2.6} marginRight={2.6}>
                                                    加入购物车
                                                </Typography>
                                            </Button>
                                            <Button sx={{ bgcolor: "#DC143C" }}>
                                                <Grid item color={"white"}>
                                                    <Typography display={"block"} fontSize={20} sx={{ fontWeight: 'bold' }} marginLeft={4} marginRight={4}>
                                                        立即购买
                                                    </Typography>
                                                    <Typography display={"block"} fontSize={14} marginLeft={2} marginRight={2}>
                                                        到手价${info.price}
                                                    </Typography>
                                                </Grid>
                                            </Button>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}
export default Product