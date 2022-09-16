import {StacksNetwork} from '@stacks/network';
import numeral from 'numeral';
import {NETWORK} from './types';
import {NETWORKS, EXPLORER_BASE} from './constants';

export const getStacksNetwork = (n: NETWORK): StacksNetwork => {
    return NETWORKS[n];
}

export const formatVotePower = (power: number) => {
    return numeral(power).format('0.00a');
}


export const explorerLink = (n: NETWORK, endpoint: string) => {
    return `${EXPLORER_BASE}/${endpoint}?chain=${n}`;
}
