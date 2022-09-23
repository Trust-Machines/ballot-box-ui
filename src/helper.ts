import numeral from 'numeral';
import strategies from '@trustmachines/ballot-box-strategies';
import {NETWORK, StrategyOptionsRecord} from './types';
import {EXPLORER_BASE} from './constants';

export const formatVotePowerAbbr = (options: {
    power: number,
    strategy: string,
    strategyOptions: StrategyOptionsRecord,
    fractionDigits: number
}) => {
    const {power, strategyOptions, strategy, fractionDigits} = options;
    const {symbol} = strategyOptions;
    const pattern = strategies[strategy].baseOptions?.noDecimalFormat ? '0' : `0.${'0'.repeat(fractionDigits)}a`;
    return `${numeral(power).format(pattern)} ${symbol}`;
}

export const formatVotePower = (options: {
    power: number,
    strategy: string,
    strategyOptions: StrategyOptionsRecord,
    fractionDigits: number
}) => {
    const {power, strategyOptions, strategy, fractionDigits} = options;
    const {symbol} = strategyOptions;
    if (strategies[strategy].baseOptions?.noDecimalFormat) {
        return `${power} ${symbol}`;
    }
    return `${power.toFixed(fractionDigits)} ${symbol}`;
}


export const explorerLink = (n: NETWORK, endpoint: string) => {
    return `${EXPLORER_BASE}/${endpoint}?chain=${n}`;
}
