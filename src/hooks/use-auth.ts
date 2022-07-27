import {useAtom} from 'jotai';
import {UserSession, UserData, FinishedAuthData, showConnect} from '@stacks/connect-react';
import {openSignatureRequestPopup, SignatureData} from '@stacks/connect';

import useNetwork from './use-network';
import {userSessionAtom, userDataAtom, userAuthAtom} from '../store';
import {appConfig, baseAuthOptions, SIGNATURE_MESSAGE} from '../constants';


const useUserSession = (): { auth: { signature: string, publicKey: string } | null, userSession: UserSession | null, userData: UserData | null, openAuth: () => void, signOut: () => void, requestSignature: () => void } => {
    const [userSession, setUserSession] = useAtom(userSessionAtom);
    const [userData] = useAtom(userDataAtom);
    const [userAuth, setUserAuth] = useAtom(userAuthAtom);
    const [, stacksNetwork] = useNetwork();

    const openAuth = () => {
        const authOptions = {
            onAuthFinish,
            userSession: new UserSession({appConfig}),
            ...baseAuthOptions
        };
        setUserSession(null);
        showConnect(authOptions);
    };

    const onAuthFinish = async (payload: FinishedAuthData) => {
        setUserSession(payload.userSession);

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
                setUserAuth({signature: data.signature, publicKey: data.publicKey});
            },
        };

        openSignatureRequestPopup(signOptions).then()
    }

    return {
        auth: null, userSession, userData, openAuth, signOut, requestSignature
    };
}

export default useUserSession;
