import {useAtom} from 'jotai';
import {UserSession, UserData, FinishedAuthData, showConnect} from '@stacks/connect-react';
import {openSignatureRequestPopup, SignatureData} from '@stacks/connect';

import {userSessionAtom, userDataAtom, userAuthAtom} from '../store';
import {appConfig, baseAuthOptions, NETWORKS, SIGNATURE_MESSAGE} from '../constants';


const useAuth = (): { auth: { signature: string, publicKey: string } | null, session: UserSession | null, data: UserData | null, openAuth: () => void, signOut: () => void, requestSignature: () => void } => {
    const [userSession, setUserSession] = useAtom(userSessionAtom);
    const [userData] = useAtom(userDataAtom);
    const [userAuth, setUserAuth] = useAtom(userAuthAtom);


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
            network: NETWORKS['mainnet'],
            onFinish: (data: SignatureData) => {
                setUserAuth({signature: data.signature, publicKey: data.publicKey});
            },
        };

        openSignatureRequestPopup(signOptions).then();
    }

    return {
        auth: userAuth, session: userSession, data: userData, openAuth, signOut, requestSignature
    };
}

export default useAuth;
