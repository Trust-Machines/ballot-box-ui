import {useTheme} from '@mui/material';
import {blue, green, grey, purple} from '@mui/material/colors';
import {Proposal} from '../types';

const useStyles = () => {
    const theme = useTheme();
    const appBgLight = '#ffffff';
    const appBgDark = '#3b3b3b';

    return {
        appBgLight,
        appBgDark,
        appBg: theme.palette.mode === 'light' ? appBgLight : appBgDark,
        textColor: theme.palette.mode === 'light' ? grey[900] : grey[300],
        mutedTextColor: theme.palette.mode === 'light' ? grey[600] : grey[500],
        menuBgColor: theme.palette.mode === 'light' ? grey[50] : grey[900],
        linkColor: theme.palette.mode === 'light' ? grey[800] : grey[200],
        linkHoverColor: grey[500],
        proposalColor: (proposal: Proposal): string => {
            switch (proposal.status) {
                case 'new':
                    return blue[300];
                case 'on':
                    return green[600];
                case 'off':
                    return purple[700];
                default:
                    return ''
            }
        }
    }
}

export default useStyles;
