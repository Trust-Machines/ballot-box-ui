import {Box} from '@mui/material';
import {grey} from '@mui/material/colors';
import {useTheme} from '@mui/material';

import useMediaBreakPoint from '../../hooks/use-media-break-point';
import useAppMenuVisibility from '../../hooks/use-app-menu-visibility';

const AppMenu = () => {
    const theme = useTheme();
    const [isSm] = useMediaBreakPoint();
    const [appMenuVisibility, toggleAppMenuVisibility] = useAppMenuVisibility();

    const menu = <Box sx={{
        display: 'flex',
        flexGrow: 0,
        flexShrink: 0,
        width: '60px',
        borderRight: `1px solid ${theme.palette.divider}`,
        background: theme.palette.mode === 'light' ? '#fff' : grey[900],
    }}>

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
