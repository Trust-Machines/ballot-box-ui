import {useEffect} from 'react';
import {useAtom} from 'jotai';
import {PaletteMode} from '@mui/material';
import {themeAtom} from '../store';

const useAppTheme = (): [PaletteMode, () => void] => {
    const [theme, setTheme] = useAtom(themeAtom);
    useEffect(() => {
        document.body.style.background = theme === 'dark' ? '#3b3b3b' : '#ffffff';
        console.log('henlo', theme)
    }, [theme]);

    const toggleAppTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('app_theme', newTheme);
    }

    return [theme, toggleAppTheme];
}

export default useAppTheme;
