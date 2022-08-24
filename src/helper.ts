import {StacksNetwork} from '@stacks/network';
import numeral from 'numeral';
import {NETWORK} from './types';
import {NETWORKS} from './constants';


export const getStacksNetwork = (n: NETWORK): StacksNetwork => {
    return NETWORKS[n];
}

export const formatVotePower = (power: number) => {
    return numeral(power).format('0.00a');
}
