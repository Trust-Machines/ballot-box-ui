import {Box} from '@mui/material';
import {grey} from '@mui/material/colors';
import {useTheme} from '@mui/material';

import useMediaBreakPoint from '../../hooks/use-media-break-point';

const AppMenu = () => {
    const theme = useTheme();
    const [isSm] = useMediaBreakPoint();

    return <Box sx={{
        display: 'flex',
        flexGrow: 0,
        flexShrink: 0,
        width: '60px',
        borderRight: `1px solid ${theme.palette.divider}`,
        background: theme.palette.mode === 'light' ? '#fff' : grey[900],
    }}>

    </Box>
}


export default AppMenu;
