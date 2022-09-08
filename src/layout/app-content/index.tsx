import React from 'react';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material';
import AppFooter from '../app-footer';

const AppContent = (props: { children: React.ReactNode }) => {
    const {children} = props;
    const theme = useTheme();

    return <>
        <Box sx={{
            width: 'calc(100% - 10px)',
            maxWidth: `${theme.breakpoints.values.md}px`,
            margin: 'auto',
            flexGrow: 1,
            p: '20px 5px 100px 5px'
        }}>{children}</Box>
        <AppFooter/>
    </>
}

export default AppContent;
