import {atom} from 'jotai';
import {UserSession, UserData} from '@stacks/connect-react';
import {appConfig} from '../constants';
import {USER_AUTH} from '../types';

const initial = () => {
    const session = new UserSession({appConfig})
    return session.isUserSignedIn() ? session : null;
}

export const userSessionAtom = atom<UserSession | null>(initial());

export const userDataAtom = atom<UserData | null>((get) => {
    const session = get(userSessionAtom);
    return session && session.isUserSignedIn() ? session.loadUserData() : null
});

export const userAuthAtom = atom<USER_AUTH | null>(null);
