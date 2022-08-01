import Box from '@mui/material/Box';
import {useTheme} from '@mui/material';
import {Space} from '../../../../types';
import SpaceIcon from '../../../../components/space-icon';


const SpaceCard = (props: { space: Space }) => {
    const theme = useTheme();
    const {space} = props;

    return <Box sx={{
        border: `1px solid ${theme.palette.divider}`,
        padding: '16px',
        borderRadius: '12px',
        width: '200px'
    }}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <SpaceIcon space={space} sx={{width: '80px', marginBottom: '12px'}}/>
            <Box sx={{
                fontSize: '22px',
                fontWeight: '700',
            }}>{space.name}</Box>
        </Box>
    </Box>
}

export default SpaceCard;
