import {NETWORKS} from '../constants';

export const getBnsName = (address: string): Promise<string | null> => {
    return fetch(`${NETWORKS['mainnet'].coreApiUrl}/v1/addresses/stacks/${address}`).then(r => r.json()).then(r => {
        if (r.names.length > 0) {
            return r.names[0];
        }
        return null;
    })
}

export const getBlock = (height: number): Promise<{
    hash: string
}> => {
    return fetch(`${NETWORKS['mainnet'].coreApiUrl}/extended/v1/block/by_height/${height}`).then(r => r.json());
}
