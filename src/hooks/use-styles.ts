import {useTheme} from '@mui/material';
import {grey} from '@mui/material/colors';

const useStyles = () => {
    const theme = useTheme();

    return {
        appBgColor: theme.palette.mode === 'light' ? grey[900] : grey[300],
        menuBgColor: theme.palette.mode === 'light' ? grey[50] : grey[900],
        linkColor: theme.palette.mode === 'light' ? grey[800] : grey[200],
        linkHoverColor: grey[500]
    }
}

export default useStyles;
