import { Box, Container, Grid, Typography } from '@mui/material';
import AccountProfile from './other-profile';
import { AccountProfileDetails } from './other-profile-details';

const OtherPage = ({ username }) => (
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
                        <AccountProfile
                            username={username}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={6}
                        xs={12}
                    >
                        <AccountProfileDetails
                            username={username}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </>
);

export default OtherPage;