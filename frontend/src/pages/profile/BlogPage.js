// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from './Iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from './blog';
import { useState, useEffect } from 'react';
import qs from 'qs';
export default function BlogPage({ username, modifiable }) {
    const SORT_OPTIONS = [
        { value: 'latest', label: 'Latest' },
        { value: 'oldest', label: 'Oldest' },
    ];
    const [value, setValue] = useState('latest');
    const onSort = (event) => {
        setValue(event.target.value);
    }
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch("/api/blog/fetchUserArticles/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: qs.stringify({
                username: username,
                op: value === "latest" ? 0 : 1
            })
        }).then(res => res.json()).then(data => {
            setPosts(data)
            console.log(data)
        })
    }, [username, value])
    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Blog
                    </Typography>
                    {modifiable ? <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Post
                    </Button> : null}
                </Stack>

                <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
                    <BlogPostsSearch posts={posts} />
                    <BlogPostsSort options={SORT_OPTIONS} onSort={onSort} value={value} />
                </Stack>

                <Grid container spacing={3}>
                    {posts.map((post, index) => (
                        <BlogPostCard key={post.id} post={post} index={index} />
                    ))}
                </Grid>
            </Container>
        </>
    );
}
