import React, { useEffect } from 'react';
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
import { UploadOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { Upload } from 'antd';
import { useState, useContext } from 'react'
import { UserContext } from '../../components/UserContext/UserContext'
import qs from 'qs'
function AccountProfile() {
    const { data, dispatch } = useContext(UserContext);
    const [fileList, setFileList] = useState([]);
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        fetch('/api/user/fixProfile/', {
            method: 'POST',
            body: formData
        }).then(res => {
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
                    message.error("上传失败")
                } else {
                    message.success("上传头像成功")
                    dispatch({ type: "render", status: true, info: data })
                    console.log(data)
                }
            })
        })
        return false;
    };
    return (
        <Card>
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
        </Card>
    );
}
export default AccountProfile;