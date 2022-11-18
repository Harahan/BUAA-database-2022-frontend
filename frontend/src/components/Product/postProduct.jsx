import rhaenyra_targaryen from '../../assets/rhaenyra_targaryen.jpg';
import { Box, Container, Grid, Card, CardActions, CardContent, Button, Typography, InputLabel, TextField, CardHeader } from '@mui/material';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { message } from 'antd';
import { Upload } from 'antd';
import { ColorMultiPicker } from './components/color-utils';
import qs from 'qs'
const options = [
    {
        value: null,
        label: 'Select a category',
    },
    {
        value: 'food',
        label: 'food'
    },
    {
        value: 'clothing',
        label: 'clothing'
    },
    {
        value: 'book',
        label: 'book'
    },
    {
        value: 'decoration',
        label: 'decoration'
    },
    {
        value: 'digital',
        label: 'digital'
    },
    {
        value: 'other',
        label: 'other'
    },
];
function PostProduct() {
    const [value, setValue] = useState({
        image: rhaenyra_targaryen,
        file: null,
        name: '',
        description: '',
        price: '',
        priceSale: '',
        deliveryLocation: '',
        deliveryTime: '',
        category: '',
        color: [],
    });
    const [fileList, setFileList] = useState([]);
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async (file) => {
        console.log(file);
        let src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
        });
        setValue({
            ...value,
            image: src,
            file: file,
        })
        fileList.length = 0
        message.success('Image uploaded successfully');
        return false;
    };
    const handleClick = () => {
        console.log(value)
    }
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
                                <img src={value.image} style={{
                                    width: "400px",
                                    height: "300px",
                                }} />
                            </Grid>
                            <CardActions>
                                <Grid
                                    container
                                    spacing={0}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Upload
                                        fileList={fileList}
                                        onChange={onChange}
                                        beforeUpload={(file) => onPreview(file)}
                                        showUploadList={false}
                                    >
                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>
                                </Grid>
                            </CardActions>
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
                                    <CardHeader
                                        subheader="The information can be edited"
                                        title="Product Information"
                                    />
                                    <CardContent>
                                        <Grid
                                            container
                                            spacing={3}
                                        >
                                            <Grid
                                                item
                                                md={12}
                                                xs={12}
                                            >
                                                <TextField required label="Name" placeholder='请输入商品名' fullWidth
                                                    onChange={(e) => {
                                                        setValue({
                                                            ...value,
                                                            name: e.target.value,
                                                        })
                                                    }} />
                                            </Grid>
                                            <Grid
                                                item
                                                md={12}
                                                xs={12}
                                            >
                                                <TextField required label="Description" placeholder='请输入商品描述' fullWidth
                                                    onChange={(e) => {
                                                        setValue({
                                                            ...value,
                                                            description: e.target.value,
                                                        })
                                                    }} />
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <TextField required label="Price" placeholder='请输入商品价格' fullWidth
                                                    type="number"
                                                    onChange={(e) => {
                                                        setValue({
                                                            ...value,
                                                            price: e.target.value
                                                        })
                                                    }} />
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <TextField required label="Discount" placeholder='请输入商品折后价' fullWidth
                                                    type="number"
                                                    onChange={(e) => {
                                                        setValue({
                                                            ...value,
                                                            priceSale: e.target.value
                                                        })
                                                    }} />
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <TextField required label="Delivery Location" placeholder='请输入运送地点' fullWidth
                                                    onChange={(e) => {
                                                        setValue({
                                                            ...value,
                                                            deliveryLocation: e.target.value,
                                                        })
                                                    }} />
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <TextField required label="Delivery Time" placeholder='请输入运送时间' fullWidth
                                                    onChange={(e) => {
                                                        setValue({
                                                            ...value,
                                                            deliveryTime: e.target.value
                                                        })
                                                    }} />
                                            </Grid>
                                            <Grid
                                                item
                                                md={12}
                                                xs={12}
                                            >
                                                <InputLabel >Category</InputLabel>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    select
                                                    SelectProps={{ native: true }}
                                                    onChange={(e) => {
                                                        setValue({
                                                            ...value,
                                                            category: e.target.value
                                                        })
                                                    }}
                                                >
                                                    {options.map((option) => (
                                                        <option
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            container
                                            md={12}
                                            xs={12}
                                            direction="row"
                                            alignContent={"center"}
                                            justifyContent={"center"}
                                            gap={2}
                                        >
                                            <Grid
                                                item
                                                marginTop={3}
                                                marginBottom={3}
                                            >
                                                <Typography color="grey" fontSize={15}>
                                                    颜色种类
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                            >
                                                <ColorMultiPicker
                                                    name="colors"
                                                    selected={value.color}
                                                    colors={[
                                                        '#00AB55',
                                                        '#000000',
                                                        '#FFFFFF',
                                                        '#FFC0CB',
                                                        '#FF4842',
                                                        '#1890FF',
                                                        '#94D82D',
                                                        '#FFC107',
                                                    ]}
                                                    onChangeColor={(item) => {
                                                        if (value.color.includes(item)) {
                                                            setValue({
                                                                ...value,
                                                                color: value.color.filter((i) => i !== item),
                                                            });
                                                        } else {
                                                            setValue({
                                                                ...value,
                                                                color: [...value.color, item],
                                                            });
                                                        }
                                                    }}
                                                    sx={{ maxWidth: 38 * 4 }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            color="primary"
                                            fullWidth
                                            variant="contained"
                                            onClick={handleClick}
                                            disabled={value.file === null || value.name === '' || value.description === '' || value.price === '' || value.priceSale === '' ||
                                                value.deliveryTime === '' || value.deliveryLocation === '' || value.category === '' || value.color.length === 0}
                                        >
                                            Post Product
                                        </Button>
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
export default PostProduct