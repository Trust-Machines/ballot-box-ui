import {NETWORKS} from '../constants';
import {NETWORK} from '../types';

export const getBnsName = (address: string): Promise<string | null> => {
    return fetch(`${NETWORKS['mainnet'].coreApiUrl}/v1/addresses/stacks/${address}`).then(r => r.json()).then(r => {
        if (r.names.length > 0) {
            return r.names[0];
        }
        return null;
    })
}

export const getBlock = (network: NETWORK, height: number): Promise<{
    height: number,
    hash: string,
    index_block_hash: string
}> => {
    return fetch(`${NETWORKS[network].coreApiUrl}/extended/v1/block/by_height/${height}`).then(r => r.json());
}

export const getCurrentBlock = (network: NETWORK): Promise<{
    height: number
}> => {
    return fetch(`${NETWORKS[network].coreApiUrl}/extended/v1/block`)
        .then(r => r.json())
        .then(r => r.results[0])
}
