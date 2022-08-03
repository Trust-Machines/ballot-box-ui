import {useEffect} from 'react';
import {useAtom} from 'jotai';

import useAddress from './use-address';
import useNetwork from './use-network';
import {getBnsName} from '../api/stacks';

import {bnsNameAtom} from '../store';

const useBnsName = (): { address: string, name: string } | null => {
    const [bns, setBns] = useAtom(bnsNameAtom);
    const address = useAddress();
    const [network, stacksNetwork] = useNetwork()

    useEffect(() => {
        if (!address) {
            setBns(null);
            return;
        }

        if (bns?.address === address) {
            return;
        }

        getBnsName(stacksNetwork, address).then((r) => {
            if (r) {
                setBns({address, name: r});
            } else {
                setBns(null);
            }
        }).catch(() => {
            setBns(null);
        });
    }, [setBns, address, network, stacksNetwork]);

    return bns;
}

export default useBnsName;
