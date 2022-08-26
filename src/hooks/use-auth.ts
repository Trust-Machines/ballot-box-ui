import {useAtom} from 'jotai';
import {UserSession, UserData, FinishedAuthData, showConnect} from '@stacks/connect-react';
import {useAccount} from '@micro-stacks/react';
import {StacksSessionState} from 'micro-stacks/connect';
import {useAccountsRaw} from '@micro-stacks/react';
import {useAuth as useAuth1} from '@micro-stacks/react';
import {useOpenSignMessage} from '@micro-stacks/react';
import {userDataAtom, userAuthAtom} from '../store';
import {SIGNATURE_MESSAGE} from '../constants';


const useAuth = (): { auth: { signature: string, publicKey: string } | null, data: UserData | null, openAuth: () => void, signOut: () => void, requestSignature: () => void } => {
    const [userData] = useAtom(userDataAtom);
    const [userAuth, setUserAuth] = useAtom(userAuthAtom);
    const {openAuthRequest, signOut} = useAuth1()
    const {openSignMessage} = useOpenSignMessage();
    const a  = useAccountsRaw();
    console.log(a[0].address)

    const openAuth = () => {
        setUserAuth(null);
        openAuthRequest().then(() => {
            requestSignature();
        })
    };

    const requestSignature = () => {
        const signOptions = {
            message: SIGNATURE_MESSAGE
        };

        openSignMessage(signOptions).then((data) => {
            if (!data) {
                return;
            }
            setUserAuth({signature: data.signature, publicKey: data.publicKey});
        });
    }

    return {
        auth: userAuth, data: userData, openAuth, signOut, requestSignature
    };
}

export default useAuth;
