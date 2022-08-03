import React from 'react';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {useNavigate} from '@reach/router';
import useStyles from '../../hooks/use-styles';

const Link = (props: { children: React.ReactElement | React.ReactNode, to: string, sx?: SxProps<Theme> }) => {
    const {sx, children, to} = props;
    const navigate = useNavigate();
    const {linkColor, linkHoverColor} = useStyles();

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
