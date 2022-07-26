import Box from '@mui/material/Box';
import {grey} from '@mui/material/colors';
import {useTheme} from '@mui/material';

import Brand from './components/brand';
import AppMenuToggle from './components/app-menu-toggle';
import Wallet from './components/wallet';
import NetworkSwitch from './components/network-switch';
import useMediaBreakPoint from '../../hooks/use-media-break-point';

const PageHeader = () => {
    const theme = useTheme();
    const [isSm, isMd] = useMediaBreakPoint();

    return <Box sx={{
        height: '70px',
        flexShrink: 0,
        flexGrow: 0,
        borderBottom: `1px solid ${theme.palette.divider}`,
    }}>
        <Box sx={{
            maxWidth: `${theme.breakpoints.values.md}px`,
            padding: '0 10px',
            margin: 'auto',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
        }}>
            {!isSm ? <AppMenuToggle /> : <Brand/>}
            <Box sx={{flexGrow: 1}}/>
            <Wallet/>
            <NetworkSwitch/>
        </Box>
    </Box>;
}

export default PageHeader;
