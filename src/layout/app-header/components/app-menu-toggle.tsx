import MenuIcon from '@mui/icons-material/Menu';
import {Box} from '@mui/material';
import useAppMenuVisibility from '../../../hooks/use-app-menu-visibility';

const AppMenuToggle = () => {
    const [, toggleAppMenuVisibility] = useAppMenuVisibility();

    return <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
        }}
        onClick={toggleAppMenuVisibility}>
        <MenuIcon fontSize="large" color={'action'}/>
    </Box>
}

export default AppMenuToggle;
