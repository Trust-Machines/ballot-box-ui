import React from 'react';

import {Box} from '@mui/material';
import {useTheme} from '@mui/material';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';
import {useNavigate} from '@reach/router';

const AppMenuItem = (props: { children: React.ReactNode, sx?: SxProps<Theme>, onClick?: () => void, href?: string }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const {children, sx, onClick, href} = props;

    return <Box onClick={() => {
        if (onClick) {
            onClick();
            return;
        }

        if (href) {
            navigate(href).then();
        }

    }} sx={{
        ...{
            cursor: 'pointer',
            width: '50px',
            height: '50px',
            mb: '6px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${theme.palette.divider}`,
            '&:hover': {
                opacity: .8
            }
        },
        ...sx
    }}>{children}</Box>;
}


export default AppMenuItem;
