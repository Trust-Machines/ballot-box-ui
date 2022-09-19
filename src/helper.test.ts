import {formatVotePower, formatVotePowerAbbr} from './helper';
import {Space} from './types';


const SPACE: Space = {
    id: 12,
    userId: 4,
    picture: null,
    proposalCount: 2,
    network: 'mainnet',
    strategy: 'stx-balance',
    strategyOptions: {
        symbol: 'STX'
    },
    name: 'My space',
    about: null,
    websiteLink: null,
    termsLink: null,
    twitterHandle: null,
    githubHandle: null,
}

test('1 formatVotePower', () => {
    expect(formatVotePower(125, SPACE, 4)).toBe('125.0000 STX');
    expect(formatVotePower(2, {
        ...SPACE,
        strategy: 'sip-009-balance'
    }, 4)).toBe('2 STX');
});


test('1 formatVotePowerAbbr', () => {
    expect(formatVotePowerAbbr(1256, SPACE, 2)).toBe('1.26k STX');
    expect(formatVotePowerAbbr(1, {
        ...SPACE,
        strategy: 'sip-009-balance'
    }, 2)).toBe('1 STX');
});

