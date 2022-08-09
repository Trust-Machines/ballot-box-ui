import React from 'react';
import Box from '@mui/material/Box';

const AppWrapper = (props: { children: React.ReactNode }) => {
    const {children} = props;

    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        flexShrink: 0,
        width: 'calc(100% - 61px)', // 61px: app menu
    }}>{children}</Box>
}

export default AppWrapper;
