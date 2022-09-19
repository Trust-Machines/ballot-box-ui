import {StacksNetwork} from '@stacks/network';
import numeral from 'numeral';
import strategies from '@trustmachines/ballot-box-strategies';
import {NETWORK, Space} from './types';
import {NETWORKS, EXPLORER_BASE} from './constants';

export const getStacksNetwork = (n: NETWORK): StacksNetwork => {
    return NETWORKS[n];
}

export const formatVotePowerAbbr = (power: number, space: Space, fractionDigits: number) => {
    const {symbol} = space.strategyOptions;
    const pattern = strategies[space.strategy].baseOptions?.noDecimalFormat ? '0' : `0.${'0'.repeat(fractionDigits)}a`;
    return `${numeral(power).format(pattern)} ${symbol}`;
}

export const formatVotePower = (power: number, space: Space, fractionDigits: number) => {
    const {symbol} = space.strategyOptions;
    if (strategies[space.strategy].baseOptions?.noDecimalFormat) {
        return `${power} ${symbol}`;
    }
    return `${power.toFixed(fractionDigits)} ${symbol}`;
}


export const explorerLink = (n: NETWORK, endpoint: string) => {
    return `${EXPLORER_BASE}/${endpoint}?chain=${n}`;
}
