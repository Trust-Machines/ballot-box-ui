import React from 'react';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material';
import useStyles from '../../hooks/use-styles';
import useTranslation from '../../hooks/use-translation';

const AppContent = (props: { children: React.ReactNode }) => {
    const {children} = props;
    const theme = useTheme();
    const {linkColor, linkHoverColor} = useStyles();
    const [t] = useTranslation();

    return <><Box sx={{
        width: 'calc(100% - 10px)',
        maxWidth: `${theme.breakpoints.values.md}px`,
        margin: 'auto',
        flexGrow: 1,
        p: '20px 5px 100px 5px'
    }}>{children}</Box>
        <Box sx={{
            height: '40px',
            flexGrow: 0,
            flexShrink: 0,
            borderTop: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Box sx={{
                color: linkHoverColor,
                textDecoration: 'none',
                cursor: 'pointer',
                ':hover': {color: linkColor}
            }} onClick={() => {
                window.open('mailto:info@ballotbox.xyz', '_blank');
            }}>{t('Contact Support')}</Box>
        </Box>
    </>
}

export default AppContent;
