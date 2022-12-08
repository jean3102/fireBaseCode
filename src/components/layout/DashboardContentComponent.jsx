import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import NavComponent from "./NavComponent";
import { blue } from "@mui/material/colors";
import { AuthContext } from '../context/Auth';




const theme = createTheme({
    palette: {
        primary: {
            main: '#1565c0',
        },
        secondary: blue,
    },
});

const DashboardContentComponent = ({ children }) => {
    const navigate = useNavigate();
    const { userData, isOnline } = React.useContext(AuthContext)

    React.useEffect(() => {
/* Checking if the user is logged in. If not, it will redirect to the login page. */
        if (!localStorage.getItem('user')) navigate('/')
    }, [isOnline])


    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <NavComponent />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="false" sx={{ mt: 5, mb: 5 }}>
                        <Grid container spacing={3} >
                            {/* Body */}
                            {children}
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default DashboardContentComponent