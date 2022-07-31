import {useAtom} from 'jotai';
import {useEffect} from 'react';

import useAuth from './use-auth';
import {userIdAtom, userSpacesAtom} from '../store';
import {getMe, getUserSpaces} from '../api';
import {Space} from '../types';


const useUserData = (): { userId: number | null, userSpaces: Space[], addSpace: (space: Space) => void } => {
    const [userId, setUserId] = useAtom(userIdAtom);
    const [userSpaces, setUserSpaces] = useAtom(userSpacesAtom);
    const {auth, session} = useAuth();

    useEffect(() => {
        if (!session) {
            localStorage.removeItem('user_id');
        }
    }, [session]);

    useEffect(() => {
        if (auth) {
            getMe(auth).then(r => {
                localStorage.setItem('user_id', String(r.id));
                setUserId(r.id);
            });
        }
    }, [auth, setUserId]);

    useEffect(() => {
        if (userId) {
            getUserSpaces(userId).then(r => {
                setUserSpaces(r);
            })
        }
    }, [userId, setUserSpaces]);

    const addSpace = (space: Space) => {
        setUserSpaces([...userSpaces, space]);
    }

    return {userId, userSpaces, addSpace};
}

export default useUserData;
