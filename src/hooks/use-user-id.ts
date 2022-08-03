import {useAtom} from 'jotai';
import {useEffect} from 'react';

import useAuth from './use-auth';
import {userIdAtom} from '../store';
import {getMe} from '../api';

const useUserId = (): number | null => {
    const [userId, setUserId] = useAtom(userIdAtom);
    const {auth, session} = useAuth();

    useEffect(() => {
        if (!session) {
            localStorage.removeItem('user_id');
        }
    }, [session]);

    useEffect(() => {
        if (auth) {
            if (userId) {
                return;
            }
            getMe(auth).then(r => {
                localStorage.setItem('user_id', String(r.id));
                setUserId(r.id);
            });
        }
    }, [auth]);

    return userId
}

export default useUserId;
