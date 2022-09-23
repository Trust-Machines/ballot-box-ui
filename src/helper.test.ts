import {formatVotePower, formatVotePowerAbbr} from './helper';

test('1 formatVotePower', () => {
    expect(formatVotePower({
        power: 125,
        strategy: 'stx-balance',
        strategyOptions: {
            symbol: 'STX'
        },
        fractionDigits: 4
    })).toBe('125.0000 STX');

    expect(formatVotePower({
            power: 2,
            strategy: 'sip-009-balance',
            strategyOptions: {symbol: 'STX'},
            fractionDigits: 4
        }
    )).toBe('2 STX');
});


test('1 formatVotePowerAbbr', () => {
    expect(formatVotePowerAbbr(
        {
            power: 1256,
            strategy: 'stx-balance',
            strategyOptions: {symbol: 'STX'},
            fractionDigits: 2
        }
    )).toBe('1.26k STX');

    expect(formatVotePowerAbbr({
            power: 1,
            strategy: 'sip-009-balance',
            strategyOptions: {symbol: 'STX'},
            fractionDigits: 2
        }
    )).toBe('1 STX');
});

