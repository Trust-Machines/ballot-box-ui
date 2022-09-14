import {useAtom} from 'jotai';
import {UserSession, UserData, FinishedAuthData, showConnect} from '@stacks/connect-react';
import {openSignatureRequestPopup, SignatureData} from '@stacks/connect';

import {userSessionAtom, userDataAtom, userAuthAtom, authWindowStateAtom} from '../store';
import {appConfig, baseAuthOptions, NETWORKS, SIGNATURE_MESSAGE} from '../constants';
import {USER_AUTH} from '../types';

const useAuth = (): { auth: { signature: string, publicKey: string } | null, session: UserSession | null, data: UserData | null, requestAuth: () => Promise<any>, signOut: () => void, requestSignature: () => Promise<USER_AUTH> } => {
    const [userSession, setUserSession] = useAtom(userSessionAtom);
    const [userData] = useAtom(userDataAtom);
    const [userAuth, setUserAuth] = useAtom(userAuthAtom);
    const [, setAuthWindowState] = useAtom(authWindowStateAtom);

    const requestAuth = (): Promise<any> => new Promise((resolve, reject) => {
        setAuthWindowState(true);
        const authOptions = {
            onFinish: (payload: FinishedAuthData) => {
                setAuthWindowState(false);
                setUserSession(payload.userSession);
                resolve(true);
            },
            onCancel: () => {
                setAuthWindowState(false);
                reject();
            },
            userSession: new UserSession({appConfig}),
            ...baseAuthOptions
        };
        setUserSession(null);
        setUserAuth(null);
        showConnect(authOptions);
    });

    const signOut = () => {
        if (!userSession) {
            return;
        }

        setUserSession(null);
        userSession.signUserOut();
    }

    const requestSignature = (): Promise<any> => new Promise((resolve, reject) => {
        setAuthWindowState(true);
        const signOptions = {
            userSession: userSession!,
            ...baseAuthOptions,
            message: SIGNATURE_MESSAGE,
            network: NETWORKS['mainnet'],
            onFinish: (data: SignatureData) => {
                setAuthWindowState(false);
                const auth = {signature: data.signature, publicKey: data.publicKey};
                setUserAuth(auth);
                resolve(auth);
            },
            onCancel: () => {
                setAuthWindowState(false);
                reject();
            }
        };

        openSignatureRequestPopup(signOptions).then();
    });

    return {
        auth: userAuth, session: userSession, data: userData, requestAuth, signOut, requestSignature
    };
}

export default useAuth;
