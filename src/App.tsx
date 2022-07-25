import React from 'react';
import {Router} from '@reach/router';
import {grey} from '@mui/material/colors';
import {useTheme} from '@mui/material';
import Home from './views/home';


function App() {
    const theme = useTheme();

    return (
        <Router style={{
            minHeight: '100vh',
            display: 'flex',
            color: theme.palette.mode === 'light' ? grey[900] : grey[300]
        }}>
            <Home path='/'/>
        </Router>
    );
}

export default App;
