import {useEffect} from 'react';
import {useAtom} from 'jotai';
import {PaletteMode} from '@mui/material';
import useStyles from './use-styles';
import {themeAtom} from '../store';

const useAppTheme = (): [PaletteMode, () => void] => {
    const [theme, setTheme] = useAtom(themeAtom);
    const styles = useStyles();

    useEffect(() => {
        document.body.style.background = theme === 'dark' ? styles.appBgDark : styles.appBgLight;
    }, [theme]);

    const toggleAppTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('app_theme', newTheme);
    }

    return [theme, toggleAppTheme];
}

export default useAppTheme;
