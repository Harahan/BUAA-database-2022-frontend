import { Box, Container, Grid, Typography } from '@mui/material';
import AccountProfile from './account-profile';
import { AccountProfileDetails } from './account-profile-details';

const Page = () => (
    <>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    sx={{ mb: 3 }}
                    variant="h4"
                >
                    Account
                </Typography>
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xs={12}
                    >
                        <AccountProfile />
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={6}
                        xs={12}
                    >
                        <AccountProfileDetails />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </>
);

export default Page;