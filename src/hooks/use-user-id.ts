import {useAtom} from 'jotai';
import {useEffect} from 'react';

import useAuth from './use-auth';
import {userIdAtom} from '../store';
import {getMe} from '../api/ballot-box';

const useUserId = (): number | null => {
    const [userId, setUserId] = useAtom(userIdAtom);
    const {auth, data} = useAuth();

    useEffect(() => {
        if (!data) {
            setUserId(null);
            localStorage.removeItem('user_id');
        }
    }, [data]);

    useEffect(() => {
        if (auth) {
            if (userId) {
                return;
            }
            getMe(auth).then(r => {
                setUserId(r.id);
                localStorage.setItem('user_id', String(r.id));
            });
        }
    }, [auth]);

    return userId
}

export default useUserId;
