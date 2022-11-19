import {
    Avatar,
    Box,
    Card,
    CardContent,
    Typography,
} from '@mui/material';
import { useState, useEffect } from 'react'
import qs from 'qs'
export default function AccountProfile({ username }) {
    const [data, setData] = useState({})
    useEffect(() => {
        fetch("/api/user/getProfile/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: qs.stringify({
                username: username
            })
        }).then(res => res.json()).then(result => {
            console.log(result)
            setData(result)
        })
    }, [username])
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
                        src={data.avatar}
                        sx={{
                            height: 256,
                            mb: 2,
                            width: 256
                        }}
                    />
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h5"
                    >
                        {data.username}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        {data.email}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        {data.date_joined}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}