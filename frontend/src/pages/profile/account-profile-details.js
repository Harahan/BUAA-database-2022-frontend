import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
} from '@mui/material';
import { message } from 'antd';
import { useState, useContext } from 'react'
import { UserContext } from '../../components/UserContext/UserContext'
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

export const AccountProfileDetails = () => {
    const { data, dispatch } = useContext(UserContext);
    const [values, setValues] = useState({
        firstname: data.info.first_name,
        lastname: data.info.last_name,
        email: data.info.email,
        age: data.info.age,
        country: data.info.country,
        question: data.info.question,
        answer: "",
    });
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };
    const handleSubmit = () => {
        fetch("/api/user/fixProfile/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: qs.stringify(values)
        }).then(res => res.json()).then(data => {
            if (data.code != 0) {
                message.error("修改失败")
            }
        }).then(() => {
            fetch("/api/user/getProfile/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: qs.stringify({
                    username: data.info.username
                })
            }).then(res => res.json()).then(rs => {
                    if (rs.code == 1) {
                        dispatch({ type: "render", status: false, info: {} })
                    } else {
                        dispatch({ type: "render", status: true, info: rs })
                    }
                })
        })
    }
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
                            <TextField
                                fullWidth
                                helperText="Please specify the first name"
                                label="First name"
                                name="firstname"
                                onChange={handleChange}
                                value={values.firstname}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Please specify the last name"
                                label="Last name"
                                name="lastname"
                                onChange={handleChange}
                                value={values.lastname}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Please specify the age"
                                label="Age"
                                name="age"
                                onChange={handleChange}
                                type="number"
                                value={values.age}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Please specify the country"
                                label="Country"
                                name="country"
                                onChange={handleChange}
                                select
                                SelectProps={{ native: true }}
                                value={values.country}
                                variant="outlined"
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
                            <TextField
                                fullWidth
                                helperText="Please specify your email"
                                label="Email Address"
                                name="email"
                                onChange={handleChange}
                                value={values.email}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Question when retrieving password"
                                label="Question"
                                name="question"
                                onChange={handleChange}
                                value={values.question}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                {...(values.question == "" ? { disabled: true } : {})}
                                helperText="Answer when retrieving password"
                                label="Answer"
                                name="answer"
                                onChange={handleChange}
                                value={values.answer}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                    }}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Save details
                    </Button>
                </Box>
            </Card>
        </form>
    );
};