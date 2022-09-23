import {render} from '@testing-library/react';
import ProposalStrategyInfo from './proposal-strategy-info';
import {Proposal} from '../../../types';

const proposal: Proposal = {
    'id': 8,
    'userId': 1,
    'spaceId': 13,
    'title': 'Proposal with token',
    'body': null,
    'discussionLink': null,
    'startTime': 1663833600,
    'endTime': 1663952400,
    'startBlock': 76783,
    'startBlockTip': '0x28bbdab8a7283992629bd1d0cec4d795bfb1cb376a6bed5f7d83b8e51b944547',
    'choices': ['For', 'Against', 'Abstain'],
    'network': 'mainnet',
    'strategy': 'sip-010-get-balance',
    'strategyOptions': {
        'symbol': 'USDA',
        'address': 'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.usda-token',
        'decimals': 6
    },
    'status': 'on',
    'voteCount': 0,
    'voteStats': [{'choice': 'For', 'power': 0}, {'choice': 'Against', 'power': 0}, {'choice': 'Abstain', 'power': 0}],
}

test('1 Default render', () => {
    const view = render(<ProposalStrategyInfo proposal={proposal}/>);
    expect(view.container).toMatchSnapshot()
});
