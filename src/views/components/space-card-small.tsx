import {useTheme} from '@mui/material';
import Box from '@mui/material/Box';
import {grey} from '@mui/material/colors';
import useStyles from '../../hooks/use-styles';
import Link from '../../components/link';
import SpaceIcon from '../../components/space-icon';
import {Space} from '../../types';

const SpaceCardSmall = (props: { space: Space }) => {
    const {space} = props;
    const theme = useTheme();
    const {linkHoverColor, textTruncateStyles} = useStyles();

    return <Link to={`/spaces/${space.id}`}>
        <Box sx={{
            border: `1px solid ${theme.palette.divider}`,
            padding: '20px',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            ':hover': {
                borderColor: linkHoverColor
            }
        }}>
            <SpaceIcon space={space} sx={{
                width: '100px',
                height: '100px',
                fontSize: '40px',
                background: theme.palette.mode === 'light' ? grey[200] : grey[900],
                mb: '16px'
            }}/>
            <Box sx={{
                fontSize: '18px',
                fontWeight: '600',
                maxWidth: '160px',
                ...textTruncateStyles
            }}>{space.name}</Box>
        </Box>
    </Link>;
}

export default SpaceCardSmall;
