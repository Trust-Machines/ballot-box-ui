import React from 'react';

import Box from '@mui/material/Box';
import {useTheme} from '@mui/material';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';

const ThemedBox = (props: { children: React.ReactNode, sx?: SxProps<Theme> }) => {
    const theme = useTheme();

    return <Box sx={
        {
            ...{
                border: `1px solid ${theme.palette.divider}`,
                padding: '16px',
                borderRadius: '12px',
            },
            ...props.sx
        }
    }>{props.children}</Box>
}

export default ThemedBox
