import React from 'react';
import {Box, useTheme} from '@mui/material';

const AppContent = (props: { children: React.ReactNode }) => {
    const {children} = props;
    const theme = useTheme();

    return <Box sx={{
        width: '100%',
        maxWidth: `${theme.breakpoints.values.md}px`,
        margin: 'auto',
        flexGrow: 1,
        p: '20px 0'
    }}>{children}</Box>
}

export default AppContent;
