import useAuth from './use-auth';
import {NETWORK} from '../types';

const useAddress = (network: NETWORK): string | null => {
    const {data} = useAuth();
    return data ? data.profile.stxAddress[network] : null;
}

export default useAddress;
