import React from 'react';

import {Box} from '@mui/material';
import {useTheme} from '@mui/material';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import {useNavigate} from '@reach/router';

const AppMenuItem = (props: { children: React.ReactNode, title: string, href?: string, blank?: boolean, onClick?: () => void, sx?: SxProps<Theme> }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const {children, title, href, blank, onClick, sx} = props;

    return <Tooltip placement="right" enterDelay={1000} title={title}><Box onClick={() => {
        if (onClick) {
            onClick();
            return;
        }

        if (href) {
            if (blank) {
                window.open(href, '_blank');
                return;
            }
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
    }}>{children}</Box></Tooltip>;
}


export default AppMenuItem;
