import React from 'react';

import {Box} from '@mui/material';
import {grey} from '@mui/material/colors';
import {useTheme} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import AppMenuItem from './menu-item';
import useMediaBreakPoint from '../../hooks/use-media-break-point';
import useAppMenuVisibility from '../../hooks/use-app-menu-visibility';
import useAppTheme from '../../hooks/use-app-theme';
import useTranslation from '../../hooks/use-translation';

const AppMenu = () => {
    const theme = useTheme();
    const [isSm] = useMediaBreakPoint();
    const [appMenuVisibility, toggleAppMenuVisibility] = useAppMenuVisibility();
    const [appTheme, toggleAppTheme] = useAppTheme();
    const [t] = useTranslation();

    const menu = <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 0,
        flexShrink: 0,
        width: '60px',
        pt: '10px',
        borderRight: `1px solid ${theme.palette.divider}`,
        background: theme.palette.mode === 'light' ? '#fff' : grey[900],
    }}>
        <AppMenuItem href="/" title={t('Home')}>
            <HomeIcon/>
        </AppMenuItem>
        <AppMenuItem href="/create-space" title={t('Create a new space')} sx={{mb: '30px'}}>
            <AddIcon/>
        </AppMenuItem>
        <AppMenuItem title={t('Toggle theme')} sx={{width: '40px', height: '40px'}} onClick={toggleAppTheme}>
            {appTheme === 'light' ? <DarkModeIcon fontSize="small"/> : <LightModeIcon fontSize="small"/>}
        </AppMenuItem>
    </Box>;

    if (!isSm) {
        const backDrop = <Box sx={{
            flexGrow: 1,
            background: theme.palette.mode === 'light' ? grey[900] : '#fff',
            opacity: .4
        }} onClick={toggleAppMenuVisibility}/>;

        return <Box sx={{
            display: appMenuVisibility ? 'flex' : 'none',
            zIndex: 98,
            position: 'absolute',
            width: '100%',
            height: '100%',

        }}>
            {menu}
            {backDrop}
        </Box>
    }

    return menu;
}


export default AppMenu;
