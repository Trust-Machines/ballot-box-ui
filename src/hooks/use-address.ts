import useAuth from './use-auth';
import useNetwork from './use-network';

const useAddress = (): string | null => {
    const {data} = useAuth();
    const [network] = useNetwork();

    if (data) {
        return data.profile.stxAddress[network];
    }

    return null;
}

export default useAddress;
