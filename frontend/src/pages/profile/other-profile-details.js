import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    OutlinedInput,
    InputLabel
} from '@mui/material';
import { useEffect, useState } from 'react'
import qs from 'qs'
const countries = [
    {
        value: null,
        label: null
    },
    {
        value: 'China',
        label: '中国China'
    },
    {
        value: 'france',
        label: '法国France'
    },
    {
        value: 'Japan',
        label: '日本Japan'
    },
    {
        value: 'Australia',
        label: '澳大利亚Australia'
    },
    {
        value: 'Britain',
        label: '英国Britain'
    },
    {
        value: 'Egypt',
        label: '埃及Egypt'
    },
    {
        value: 'Canada',
        label: '加拿大Canada'
    },
    {
        value: 'America',
        label: '美国America'
    },
    {
        value: 'Mexico',
        label: '墨西哥Mexico'
    },
    {
        value: 'Brazil',
        label: '巴西Brazil'
    },
    {
        value: 'Panama',
        label: '巴拿马Panama'
    },
    {
        value: 'Poland',
        label: '波兰Poland'
    },
    {
        value: 'Finland',
        label: '芬兰Finland'
    },
    {
        value: 'Sweden',
        label: '瑞典Sweden'
    },
    {
        value: 'Norway',
        label: '挪威Norway'
    },
    {
        value: 'Philippines',
        label: '菲律宾Philippines'
    },
    {
        value: 'Vietnam',
        label: '越南Vietnam'
    },
    {
        value: 'Laos',
        label: '老挝Laos'
    },
    {
        value: 'India',
        label: '印度India'
    },
    {
        value: 'Pakistan',
        label: '巴基斯坦Pakistan'
    },
];
export const AccountProfileDetails = ({ username }) => {
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
            console.log("detail", result)
            setData(result)
        })
    }, [username])
    return (
        <form
            autoComplete="off"
            noValidate
        >
            <Card>
                <CardHeader
                    subheader="The information can be edited"
                    title="Profile"
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <InputLabel >First name</InputLabel>
                            <TextField
                                fullWidth
                                value={data.firstname}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <InputLabel >Last name</InputLabel>
                            <TextField
                                fullWidth
                                value={data.lastname}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <InputLabel >Age</InputLabel>
                            <TextField
                                fullWidth
                                type="number"
                                value={data.age}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <InputLabel >Country</InputLabel>
                            <TextField
                                fullWidth
                                select
                                SelectProps={{ native: true }}
                                value={data.country}
                                InputProps={{
                                    readOnly: true,
                                }}
                            >
                                {countries.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <InputLabel >Email Address</InputLabel>
                            <TextField
                                fullWidth
                                value={data.email}
                                InputProps={{
                                    readOnly: true
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <InputLabel >Question</InputLabel>
                            <TextField
                                fullWidth
                                value={data.question}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </form>
    );
};