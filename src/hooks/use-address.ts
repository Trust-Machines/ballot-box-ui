import useAuth from './use-auth';
import useNetwork from './use-network';

const useAddress = (): string | null => {
    const {userData} = useAuth();
    const [network] = useNetwork();

    if (userData) {
        return userData.profile.stxAddress[network];
    }

    return null;
}

export default useAddress;
