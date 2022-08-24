import {atom} from 'jotai';

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


