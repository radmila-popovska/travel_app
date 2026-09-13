import {Box, Container} from '@mui/material';
import {Outlet} from 'react-router-dom';
import Navigation from '../components/Navigation.tsx';
import Footer from '../components/Footer.tsx';

const Layout = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                width: '100%'
            }}
        >
            <Navigation/>
            <Box
                component="main"
                sx={{
                    flex: 1,
                    py: 4,
                    width: '100%'
                }}
            >
                <Container maxWidth="lg">
                    <Outlet/>
                </Container>
            </Box><Footer/>
        </Box>
    );
};

export default Layout;


