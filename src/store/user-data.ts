import {atom} from 'jotai';
import {Space} from '../types';

const userIdInitial = () => {
    if (localStorage.getItem('user_id')) {
        try {
            return Number(localStorage.getItem('user_id'));
        } catch (e) {
            return null;
        }
    }

    return null;
}

export const userIdAtom = atom<number | null>(userIdInitial());

export const userSpacesAtom = atom<Space[]>([]);
