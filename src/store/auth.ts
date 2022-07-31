import {atom} from 'jotai';
import {UserSession, UserData} from '@stacks/connect-react';
import {appConfig} from '../constants';
import {USER_AUTH} from '../types';

const userSessionInitial = () => {
    const session = new UserSession({appConfig})
    return session.isUserSignedIn() ? session : null;
}

export const userSessionAtom = atom<UserSession | null>(userSessionInitial());

export const userDataAtom = atom<UserData | null>((get) => {
    const session = get(userSessionAtom);
    return session && session.isUserSignedIn() ? session.loadUserData() : null
});

export const userAuthAtom = atom<USER_AUTH | null>(null);

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
