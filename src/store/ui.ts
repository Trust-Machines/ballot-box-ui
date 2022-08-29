import {atom} from 'jotai';
import {Breakpoint, PaletteMode} from '@mui/material';

export type ToastType = null | 'error' | 'warning' | 'info' | 'success';

export interface Toast {
    message: null | string,
    type: ToastType
}

export type Modal = { body: JSX.Element, fullScreen?: boolean, maxWidth?:Breakpoint } | null;

const initialTheme = (): PaletteMode => {
    const s = localStorage.getItem('app_theme');
    if (s && ['dark', 'light'].includes(s)) {
        return s as PaletteMode
    }
    return 'dark'
}

export const themeAtom = atom<PaletteMode>(initialTheme());
export const toastAtom = atom<Toast>({message: null, type: null});
export const modalAtom = atom<Modal>(null);
export const appMenuVisibilityAtom = atom<boolean>(false);
export const authWindowStateAtom = atom<boolean>(false);
