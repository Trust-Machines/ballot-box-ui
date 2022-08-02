import React from 'react';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';
import {Box, useTheme} from '@mui/material';
import {useNavigate} from '@reach/router';
import {grey} from '@mui/material/colors';

const Link = (props: { children: React.ReactElement | React.ReactNode, to: string, sx?: SxProps<Theme> }) => {
    const {sx, children, to} = props;
    const navigate = useNavigate();
    const theme = useTheme();
    const linkColor = theme.palette.mode === 'light' ? grey[800] : grey[200];
    const linkHoverColor = grey[500];

    return <Box sx={{
        ...{
            color: linkColor,
            textDecoration: 'none',
            cursor: 'pointer',
            ':hover': {color: linkHoverColor}
        },
        ...sx
    }} onClick={() => {
        navigate(to).then()
    }}>
        {children}
    </Box>;
}

export default Link;
