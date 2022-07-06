import {StacksNetwork} from '@stacks/network';
import {NETWORK} from '../types';
import {NETWORKS} from '../constants';


export const getStacksNetwork = (n: NETWORK): StacksNetwork => {
    return NETWORKS[n];
}
