import {NETWORKS} from '../constants';

export const getBnsName = (address: string): Promise<string | null> => {
    return fetch(`${NETWORKS['mainnet'].getCoreApiUrl()}/v1/addresses/stacks/${address}`).then(r => r.json()).then(r => {
        if (r.names.length > 0) {
            return r.names[0];
        }
        return null;
    })
}

