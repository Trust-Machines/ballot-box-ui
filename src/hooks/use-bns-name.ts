import {useEffect} from 'react';
import {useAtom} from 'jotai';

import useAddress from './use-address';
import {getBnsName} from '../api/stacks';

import {bnsNameAtom} from '../store';

const useBnsName = (): { address: string, name: string } | null => {
    const [bns, setBns] = useAtom(bnsNameAtom);
    const address = useAddress('mainnet');

    useEffect(() => {
        if (!address) {
            setBns(null);
            return;
        }

        if (bns?.address === address) {
            return;
        }

        getBnsName(address).then((r) => {
            if (r) {
                setBns({address, name: r});
            } else {
                setBns(null);
            }
        }).catch(() => {
            setBns(null);
        });
    }, [setBns, address]);

    return bns;
}

export default useBnsName;
