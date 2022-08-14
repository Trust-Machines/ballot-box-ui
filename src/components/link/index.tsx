import React from 'react';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {useNavigate} from '@reach/router';
import useStyles from '../../hooks/use-styles';

const Link = (props: { children: React.ReactElement | React.ReactNode, to: string, external?: boolean, sx?: SxProps<Theme> }) => {
    const {sx, children, to, external} = props;
    const navigate = useNavigate();
    const {linkColor, linkHoverColor} = useStyles();

    const styles = {
        ...{
            color: linkColor,
            textDecoration: 'none',
            cursor: 'pointer',
            ':hover': {color: linkHoverColor}
        },
        ...sx
    };

    if (external) {
        return <Box component="a" sx={styles} href={to} target="_blank" rel="noreferrer">
            {children}
        </Box>
    }

    return <Box component="a" href={to} sx={styles} onClick={(e: any) => {
        e.preventDefault();
        navigate(to).then()
    }}>
        {children}
    </Box>;
}

export default Link;
