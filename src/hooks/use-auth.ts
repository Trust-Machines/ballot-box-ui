import {useAtom} from 'jotai';
import {UserSession, UserData, FinishedAuthData, showConnect} from '@stacks/connect-react';
import {openSignatureRequestPopup, SignatureData} from '@stacks/connect';

import useNetwork from './use-network';
import {userSessionAtom, userDataAtom, userAuthAtom, userIdAtom} from '../store';
import {appConfig, baseAuthOptions, SIGNATURE_MESSAGE} from '../constants';
import {getMe} from '../api';


const useAuth = (): { auth: { signature: string, publicKey: string } | null, userId: number | null, session: UserSession | null, data: UserData | null, openAuth: () => void, signOut: () => void, requestSignature: () => void } => {
    const [userSession, setUserSession] = useAtom(userSessionAtom);
    const [userData] = useAtom(userDataAtom);
    const [userAuth, setUserAuth] = useAtom(userAuthAtom);
    const [userId, setUserId] = useAtom(userIdAtom);
    const [network, stacksNetwork] = useNetwork();

    const openAuth = () => {
        const authOptions = {
            onFinish: (payload: FinishedAuthData) => {
                setUserSession(payload.userSession);
                requestSignature();
            },
            userSession: new UserSession({appConfig}),
            ...baseAuthOptions
        };
        setUserSession(null);
        setUserAuth(null);
        showConnect(authOptions);
    };

    const signOut = () => {
        if (!userSession) {
            return;
        }

        setUserSession(null);
        userSession.signUserOut();
    }

    const requestSignature = () => {
        const signOptions = {
            userSession: userSession!,
            ...baseAuthOptions,
            message: SIGNATURE_MESSAGE,
            network: stacksNetwork,
            onFinish: (data: SignatureData) => {
                const auth = {signature: data.signature, publicKey: data.publicKey};
                getMe(auth, network).then(r => {
                    localStorage.setItem('user_id', String(r.id));
                    setUserId(r.id);
                    setUserAuth(auth);
                });
            },
        };

        openSignatureRequestPopup(signOptions).then();
    }

    return {
        auth: userAuth, userId, session: userSession, data: userData, openAuth, signOut, requestSignature
    };
}

export default useAuth;
