import Box from '@mui/material/Box';
import {grey} from '@mui/material/colors';
import {useTheme} from '@mui/material';

import Brand from './components/brand';
import Wallet from './components/wallet';
import ThemeSwitch from './components/theme-switch';

import useMediaBreakPoint from '../../hooks/use-media-break-point';


const PageHeader = () => {
    const theme = useTheme();
    const [isSm] = useMediaBreakPoint();

    return <Box sx={{
        height: '70px',
        flexShrink: 0,
        flexGrow: 0,
        borderBottom: `1px solid ${theme.palette.divider}`,
    }}>
        <Box sx={{
            maxWidth: '980px',
            margin: 'auto',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
        }}>
            <Brand/>
            <Box sx={{flexGrow: 1}}/>
            <Wallet/>
            <ThemeSwitch/>
        </Box>

    </Box>;
}

export default PageHeader;
