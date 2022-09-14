import useAuth from './use-auth';
import {USER_AUTH} from '../types';


const useRequireAuthSignature = (): () => Promise<USER_AUTH> => {
    const {auth, data, requestAuth, requestSignature} = useAuth();

    return async (): Promise<USER_AUTH> => {

        if (auth) {
            return (auth);
        }

        if (!data) {
            return requestAuth().then(requestSignature);
        }

        return requestSignature();
    };
}

export default useRequireAuthSignature;
