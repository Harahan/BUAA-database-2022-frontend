import rhaenyra_targaryen from '../../assets/rhaenyra_targaryen.jpg';
import { Box, Container, Grid, Card, CardActions, CardContent, Button, Typography, Chip } from '@mui/material';
import { InputNumber } from 'antd'
import { useState } from 'react';
function Product() {
    const [value, setValue] = useState(1);
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
                                <img src={rhaenyra_targaryen} width='100%' />
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
                                        <Typography
                                            variant="button" color="textPrimary" gutterBottom
                                            sx={{ fontWeight: 'bold' }}
                                        >
                                            圆领卫衣男潮流加绒加厚宽松学生卫衣男秋冬季新款韩版潮
                                        </Typography>
                                        <Typography
                                            variant="caption" color="#DC143C" display="block" gutterBottom
                                        >
                                            双12返场 专区2件9折，3件8.5折 全场包邮
                                        </Typography>
                                    </CardContent>
                                    <CardContent>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            sx={{ bgcolor: '#DCDCDC' }}
                                            marginBottom={1}
                                        >
                                            <Grid
                                                item display={'inline'} marginRight={3}
                                            >
                                                <Typography color="#808080" fontSize={12}>
                                                    价格
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                            >
                                                <Typography color="#FF0000" display={'inline'} fontSize={12}>
                                                    ￥
                                                </Typography>
                                                <Typography color="#FF0000" display={'inline'} fontSize={18} sx={{ fontWeight: 'bold' }}>
                                                    69.00
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
                                                <Typography color="#808080" fontSize={12}>
                                                    运费
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                            >
                                                <Typography display={'block'} fontSize={12}>
                                                    浙江温州 至 阳江
                                                </Typography>
                                                <Typography display={'block'} fontSize={12}>
                                                    店铺预售，付款7天后发货
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
                                                <Typography color="#808080" fontSize={12}>
                                                    尺码
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                            >
                                                <Grid
                                                    container
                                                    direction="row"
                                                    alignItems="center"
                                                    gap={1}
                                                >
                                                    <Chip color="primary" variant="outlined" size="small" label="S/165" />
                                                    <Chip color="primary" variant="outlined" size="small" label="M/170" />
                                                    <Chip color="primary" variant="outlined" size="small" label="L/175" />
                                                    <Chip color="primary" variant="outlined" size="small" label="XL/180" />
                                                </Grid>
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
                                                <Typography display={'block'} fontSize={14} color="grey" sx={{ fontWeight: 'bold' }}>
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
                                            alignItems="center">
                                            <Button sx={{ bgcolor: "#FF9933" }}>
                                                <Typography display={'block'} fontSize={14} color="white" sx={{ fontWeight: 'bold' }}
                                                    marginTop={1.2} marginBottom={1.2} marginLeft={2.7} marginRight={2.7}>
                                                    加入购物车
                                                </Typography>
                                            </Button>
                                            <Button sx={{ bgcolor: "#DC143C" }}>
                                                <Grid item color={"white"}>
                                                    <Typography display={"block"} fontSize={14} sx={{ fontWeight: 'bold' }} marginLeft={2} marginRight={2}>
                                                        立即购买
                                                    </Typography>
                                                    <Typography display={"block"} fontSize={12} marginLeft={2} marginRight={2}>
                                                        到手价￥69.00
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