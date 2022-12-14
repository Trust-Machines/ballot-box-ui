import React, {useEffect} from 'react';
import {useAtom} from 'jotai';
import {Box} from '@mui/material';
import {grey} from '@mui/material/colors';
import {useTheme} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {useLocation} from '@reach/router';

import AppMenuItem from './menu-item'
import {spaceAtom, userSpacesAtom} from '../../store';
import SpaceIcon from '../../components/space-icon';
import useMediaBreakPoint from '../../hooks/use-media-break-point';
import useAppMenuVisibility from '../../hooks/use-app-menu-visibility';
import useAuth from '../../hooks/use-auth';
import useAppTheme from '../../hooks/use-app-theme';
import useTranslation from '../../hooks/use-translation';
import useUserId from '../../hooks/use-user-id';
import useStyles from '../../hooks/use-styles';
import {getUserSpaces} from '../../api/ballot-box';


const AppMenu = () => {
    const theme = useTheme();
    const [isSm] = useMediaBreakPoint();
    const [appMenuVisibility, toggleAppMenuVisibility] = useAppMenuVisibility();
    const [appTheme, toggleAppTheme] = useAppTheme();
    const [t] = useTranslation();
    const userId = useUserId();
    const [space] = useAtom(spaceAtom);
    const [userSpaces, setUserSpaces] = useAtom(userSpacesAtom);
    const {data: userData, requestSignature} = useAuth();
    const styles = useStyles();
    const location = useLocation();

    useEffect(() => {
        if (!userId) {
            return;
        }

        if (!userData) {
            if (userSpaces.length) {
                setUserSpaces([]);
            }
            return;
        }

        if (userSpaces.length) {
            return;
        }

        getUserSpaces(userId).then(r => {
            setUserSpaces(r);
        })

    }, [userId, userData]);

    const activeItemBorderColor = theme.palette.mode === 'light' ? grey[900] : grey[50];

    const menu = <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 0,
        flexShrink: 0,
        width: '60px',
        pt: '10px',
        borderRight: `1px solid ${theme.palette.divider}`,
        background: styles.menuBgColor,
    }}>
        <AppMenuItem href="/" title={t('Home')} sx={{
            borderColor: location.pathname === '/' ? activeItemBorderColor : null
        }}>
            <HomeIcon/>
        </AppMenuItem>
        {userData && !userId && (
            <AppMenuItem href="/" title={t('Load Communities')} onClick={requestSignature}>
                <RefreshIcon/>
            </AppMenuItem>
        )}
        {userSpaces.map(s => {
            const selected = location.pathname.startsWith('/spaces/') && space?.id === s.id;
            return <AppMenuItem title={s.name} href={`/spaces/${s.id}`} key={s.id} sx={{
                borderColor: selected ? activeItemBorderColor : null
            }}>
                <SpaceIcon space={s} sx={{width: '40px'}}/>
            </AppMenuItem>
        })}
        <AppMenuItem title={t('Create a community')} href="/create-space" sx={{
            mb: '30px',
            borderColor: location.pathname === '/create-space' ? activeItemBorderColor : null
        }}>
            <AddIcon/>
        </AppMenuItem>
        <AppMenuItem title={t('Toggle theme')} sx={{width: '40px', height: '40px'}} onClick={toggleAppTheme}>
            {appTheme === 'light' ? <DarkModeIcon fontSize="small"/> : <LightModeIcon fontSize="small"/>}
        </AppMenuItem>
        <AppMenuItem title={t('Docs')} sx={{width: '40px', height: '40px'}} href="https://docs.ballotbox.xyz" blank>
            <DescriptionIcon fontSize="small"/>
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
