import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
    Grid
} from '@mui/material';
import {
    Upload
} from 'antd';
import axios from 'axios';
import { useState, useContext } from 'react'
import { UserContext } from '../../components/UserContext/UserContext'
import qs from 'qs'
export default function AccountProfile() {
    const { data, dispatch } = useContext(UserContext);
    const [fileList, setFileList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        setIsModalVisible(true);
    };
    const onPreview = async (file) => {
        console.log(file)
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    const handleClick = () => {
        const formData = new FormData();
        fileList.forEach(item => {
            formData.append('file', item.originFileObj);
        });
        axios({
            method: 'post',
            url: 'api/user/fixProfile/',
            data: formData
        })
        fileList.length = 0
        setIsModalVisible(false)
        fetch("/api/user/getProfile/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: qs.stringify({
                username: data.info.username
            })
        }).then(res => res.json()).then(data => {
            if (data.code == 1) {
                dispatch({ type: "render", status: false, info: {} })
            } else {
                dispatch({ type: "render", status: true, info: data })
            }
        })
    }
    return (
        <Card >
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Avatar
                        src={data.info.avatar}
                        sx={{
                            height: 64,
                            mb: 2,
                            width: 64
                        }}
                    />
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h5"
                    >
                        {data.info.username}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        {data.info.email}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        {data.info.date_joined}
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
            <CardActions>
                <Grid
                    container
                    spacing={0}
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                >
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <Upload
                            action=""
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}
                            beforeUpload={() => { return false }}
                            showUploadList={{ showPreviewIcon: { isModalVisible } }}
                        >
                            {fileList.length < 1 && '+ Upload'}
                        </Upload>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <Button
                            color="primary"
                            fullWidth
                            variant="text"
                            onClick={handleClick}
                        >
                            Upload picture
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}