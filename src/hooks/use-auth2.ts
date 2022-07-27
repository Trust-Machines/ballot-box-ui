import {useEffect} from 'react';
import {openSignatureRequestPopup, SignatureData} from '@stacks/connect';

import useUserAuth from './use-auth';
import useNetwork from './use-network';
import {baseAuthOptions} from '../constants';
import {SIGNATURE_MESSAGE} from '../constants';

const useAuth2 = (): { auth: { signature: string, publicKey: string } | null } => {
    const {userSession} = useUserAuth();
    const [, stacksNetwork] = useNetwork();

    const signMessage = () => {
        const signOptions = {
            userSession: userSession!,
            ...baseAuthOptions,
            message: SIGNATURE_MESSAGE,
            network: stacksNetwork,
            onFinish: (data: SignatureData) => {
                console.log('Signature of the message', data.signature);
                console.log('Use public key', data.publicKey);
            },
        };

        openSignatureRequestPopup(signOptions).then();
    }

    useEffect(() => {
        if (userSession) {

            const signOptions = {
                userSession: userSession!,
                ...baseAuthOptions,
                message: SIGNATURE_MESSAGE,
                network: stacksNetwork,
                onFinish: (data: SignatureData) => {
                    console.log('Signature of the message', data.signature);
                    console.log('Use public key', data.publicKey);
                },
            };

            openSignatureRequestPopup(signOptions).then()

        }
    }, [stacksNetwork, userSession]);

    return {
        auth: null
    }
}

export default useAuth2;
